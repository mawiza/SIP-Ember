require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'pry'
require 'sinatra/cross_origin'

mongoDB = Mongo::Connection.new
#DB = mongoDB.db("sip_ember_db", :pool_size => 5, :timeout => 5)
DB = nil

#
#
#
configure do
  enable :cross_origin
end

#
#
#
before do
  if request.request_method == 'OPTIONS'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, PUT, DELETE"
    halt 200
  end
end

#
#
#
get '/select_db/:db' do
  #"sip_ember_db"
  #"sip_ember_test_db"
  DB = mongoDB.db(params[:db], :pool_size => 5, :timeout => 5)
  "DB #{params[:db]} selected"
end

#
#
#
get '/reset_db/:db' do  
  mongoDB.drop_database(params[:db])
  DB = mongoDB.db(params[:db], :pool_size => 5, :timeout => 5)
  "DB #{params[:db]} dropped and reselected"
end

#
#
#
get '/api/:thing' do
  if request.query_string.empty?
    #binding.pry
    collection = DB.collection(params[:thing])
    result = collection.find.to_a.map{|t| frombsonid(t, params[:thing])}.to_json
    serializeJSON(result, params[:thing])
  else    
    request.query_string.class
    parrent, id = request.query_string.split('=')    
    collection = DB.collection(params[:thing])         
    query = {modelName(params[:thing]) + "." + parrent => id}
    result = collection.find(query).to_a.map{|t| frombsonid(t, params[:thing])}.to_json
    serializeJSON(result, params[:thing])
  end
end

#
#
#
get '/api/:thing/:id' do
  find_one(params[:thing], params[:id])
end

#
#
#
post '/api/:thing' do
  json = JSON.parse(request.body.read.to_s)
  oid = DB.collection(params[:thing]).insert(json)
  find_one(params[:thing], oid.to_s)
end

#
#
#
delete '/api/:thing/:id' do
  DB.collection(params[:thing]).remove({'_id' => tobsonid(params[:id])})
  "{}"
end

#
#
#
put '/api/:thing/:id' do  
  selector = {'_id' => tobsonid(params[:id])}
  json = JSON.parse(request.body.read).reject{|k,v| k == 'id'}
  document = {'$set' => json}
  result = DB.collection(params[:thing]).update(selector, document)
  find_one(params[:thing], params[:id])
end

#
#
#
def tobsonid(id) 
    BSON::ObjectId.from_string(id) 
end

#
#
#
def frombsonid(obj, thing)
  id = obj['_id'].to_s
  obj.delete("_id")
  obj.each{|t| t[1]['id'] = id}
end

#
#
#
def serializeJSON(json, thing)
  hash = JSON.parse(json)
  jsonArray = []
  hash.each {|h| jsonArray << h[modelName(params[:thing])]}
  newJson = {modelName(params[:thing]) => jsonArray}
  newJson.to_json
end

#
#
#
def find_one(thing, id)
  frombsonid(DB.collection(thing).find_one(tobsonid(id)), thing).to_json
end

#
#
#
def modelName(thing)
  thing.chomp("s")
end
