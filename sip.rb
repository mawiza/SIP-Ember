require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'pry'


DB = Mongo::Connection.new.db("sip_ember_db", :pool_size => 5, :timeout => 5)

#class SIP < Sinatra::Base			
	get '/' do
		#binding.pry
		erb :index, :attr_wrapper => '"', :locals => {:title => 'SIP'}
	end	

	get '/:thing/' do
		#binding.pry
		erb :"#{params[:thing]}", :attr_wrapper => '"', :locals => {:title => 'SIP'}
	end	

	get '/api/:thing' do
	  # query a collection :thing, convert the output to an array, map the id 
	  # to a string representation of the object's _id and finally output to JSON
	  #binding.pry
	  DB.collection(params[:thing]).find.to_a.map{|t| frombsonid(t)}.to_json
	end
	 
	get '/api/:thing/:id' do
	  # get the first document with the id :id in the collection :thing as a single document (rather 
	  # than a Cursor, the standard output) using findone(). Our bson utilities assist with
	  # ID conversion and the final output returned is also JSON
	  frombsonid(DB.collection(params[:thing]).findone(tobsonid(params[:id]))).to_json
	end
	 
	post '/api/:thing' do
	  # parse the post body of the content being posted, convert to a string, insert into
	  # the collection #thing and return the ObjectId as a string for reference
	  oid = DB.collection(params[:thing]).insert(JSON.parse(request.body.read.to_s))
	  "{\"id\": \"#{oid.to_s}\"}"
	end
	 
	delete '/api/:thing/:id' do
	  # remove the item with id :id from the collection :thing, based on the bson
	  # representation of the object id
	  DB.collection(params[:thing]).remove('id' => tobson_id(params[:id]))
	end
	 
	put '/api/:thing/:id' do
	  # collection.update() when used with $set (as covered earlier) allows us to set single values
	  # in this case, the put request body is converted to a string, rejecting keys with the name 'id' for security purposes
	  DB.collection(params[:thing]).update({'id' => tobsonid(params[:id])}, {'$set' => JSON.parse(request.body.read.to_s).reject{|k,v| k == 'id'}})
	end
	
	# utilities for generating/converting MongoDB ObjectIds
	def tobsonid(id) BSON::ObjectId.fromstring(id) end
	def frombsonid(obj) obj.merge({'_id' => obj['_id'].to_s}) end
#end

