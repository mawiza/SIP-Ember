#
# A small generic sinatra/mongoDB CRUD api server.
#

require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'pry'
require 'sinatra/cross_origin'
require 'active_support/inflector'

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
# Taking care of Access-Control-Allow
#
before do
  if request.request_method == 'OPTIONS'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, PUT, DELETE"
    halt 200
  end
end

#
# Select the DB - for example sip_ember_db for development and sip_ember_test_db when
# running tests.
#
get '/select_db/:db' do
  DB = mongoDB.db(params[:db], :pool_size => 5, :timeout => 5)
  "DB #{params[:db]} selected"
end

#
# This will drop the DB and reload it - useful for cleaning up when running tests
#
get '/reset_db/:db' do  
  mongoDB.drop_database(params[:db])
  DB = mongoDB.db(params[:db], :pool_size => 5, :timeout => 5)
  "DB #{params[:db]} dropped and reloaded"
end

#
# Get a list of collections for a specific DB
#
get '/db_collections' do
  if DB == nil
    "Please select a DB using /select_db/:db where :db is the name of the database"
  else
    collections = DB.collection_names
    "#{collections}"
  end  
end


#
# Returns a list of things or a list of things that matches a specific query
# http://localhost:4567/api/focusareas - will retrieve all the focusareas
# http://localhost:4567/api/focusareas?theme=53bb2eba19cfd247e4000002 - will retrieve all the focusareas
# belonging to the specified theme.
# Works only with a single query parameter
get '/api/:thing' do
  content_type :json
  if request.query_string.empty?
    #binding.pry
    collection = DB.collection(params[:thing])
    result = collection.find.to_a.map{|t| frombsonid(t, params[:thing])}.to_json
    serializeJSON(result, params[:thing])
  else    
    request.query_string.class
    key, value = request.query_string.split('=')
    collection = DB.collection(params[:thing])         
    query = {modelName(params[:thing]) + "." + key => value}
    result = collection.find(query).to_a.map{|t| frombsonid(t, params[:thing])}.to_json
    serializeJSON(result, params[:thing])
  end
end

#
# Returns a thing with a specific id
#
get '/api/:thing/:id' do
  content_type :json
  find_one(params[:thing], params[:id])
end

#
# Create a new thing
#
post '/api/:thing' do
  content_type :json
  json = JSON.parse(request.body.read.to_s)
  oid = DB.collection(params[:thing]).insert(json)
  find_one(params[:thing], oid.to_s)
end

#
# Delete a thing with a specific id
#
delete '/api/:thing/:id' do
  content_type :json
  DB.collection(params[:thing]).remove({'_id' => tobsonid(params[:id])})
  "{}"
end

#
# Update a thing with a specific id
#
put '/api/:thing/:id' do
  content_type :json
  selector = {'_id' => tobsonid(params[:id])}
  json = JSON.parse(request.body.read).reject{|k,v| k == 'id'}
  document = {'$set' => json}
  result = DB.collection(params[:thing]).update(selector, document)
  find_one(params[:thing], params[:id])
end

#
# Convert the id to a BSON object id
#
def tobsonid(id) 
    BSON::ObjectId.from_string(id) 
end

#
# Extract the BSON id, then replacing the '_id' key with a 'id' key
#
def frombsonid(obj, thing)
  id = obj['_id'].to_s
  obj.delete("_id")
  obj.each{|t| t[1]['id'] = id}
end

#
# Serialize the Mongo JSON to Ember friendly JSON
#
def serializeJSON(json, thing)
  hash = JSON.parse(json)
  jsonArray = []
  hash.each {|h| jsonArray << h[modelName(params[:thing])]}
  newJson = {modelName(params[:thing]) => jsonArray}
  newJson.to_json
end

#
# Utility method
#
def find_one(thing, id)
  frombsonid(DB.collection(thing).find_one(tobsonid(id)), thing).to_json
end

#
# Very crude method to singularize the model name.
#
def modelName(thing)
  #thing.chomp("s")
  thing.singularize
end
