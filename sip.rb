require 'rubygems'
require 'sinatra'
require 'mongo'
require 'json'
require 'pry'
require 'sinatra/cross_origin'

DB = Mongo::Connection.new.db("sip_ember_db", :pool_size => 5, :timeout => 5)

configure do
  enable :cross_origin
end

before do
  if request.request_method == 'OPTIONS'
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "POST, PUT, DELETE"
    halt 200
  end
end

get '/api/:thing' do
  #binding.pry
  serializeJSON(DB.collection(params[:thing]).find.to_a.map{|t| frombsonid(t, params[:thing])}.to_json, params[:thing])
end

get '/api/:thing/:id' do
  find_one(params[:thing], params[:id])
end

post '/api/:thing' do
  json = JSON.parse(request.body.read.to_s)
  oid = DB.collection(params[:thing]).insert(json)
  find_one(params[:thing], oid.to_s)
end

delete '/api/:thing/:id' do
  DB.collection(params[:thing]).remove({'_id' => tobsonid(params[:id])})
  "{}"
end

put '/api/:thing/:id' do
  modelName = params[:thing].chomp("s")
  selector = {'_id' => tobsonid(params[:id])}
  puts selector
  json = JSON.parse(request.body.read).reject{|k,v| k == 'id'}
  document = {'$set' => json}
  puts document
  result = DB.collection(params[:thing]).update(selector, document)
  puts result
  find_one(params[:thing], params[:id])
end

def tobsonid(id) 
    BSON::ObjectId.from_string(id) 
end

def frombsonid(obj, thing)
  id = obj['_id'].to_s
  obj.delete("_id")
  obj.each{|t| t[1]['id'] = id}
end

def serializeJSON(json, thing)
  modelName = thing.chomp("s")
  hash = JSON.parse(json)
  jsonArray = []
  hash.each {|h| jsonArray << h[modelName]}
  newJson = {modelName => jsonArray}
  newJson.to_json
end

def find_one(thing, id)
  frombsonid(DB.collection(thing).find_one(tobsonid(id)), thing).to_json
end
