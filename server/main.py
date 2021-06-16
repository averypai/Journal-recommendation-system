import os
from flask import Flask, request
import logging
#from flask_cors import CORS, cross_origin
app = Flask(__name__)

from tensorflow.keras.preprocessing.sequence import pad_sequences
import numpy as np
# import pandas as pd
from google.cloud import storage

from tensorflow.keras.preprocessing.text import Tokenizer
tokenizer = Tokenizer(num_words=10000)

from nltk import word_tokenize
from tensorflow.keras import backend as K

stopwords = {'a', 'to', 'because', 'wasn', "she's", 'down', 'having', 'do', 'if', 'should', 'him', "needn't", 'have', 'than', 'from', 'any', 'only', 'his', 'against', 'at', 'yours', 'its', 'which', 'm', 'were', 'and', 'does', 'theirs', 'can', "you're", 'most', 'ours', 'hadn', "you've", 'nor', 'been', 'o', 'won', "weren't", "you'd", 'for', "mightn't", 'out', 'few', 'where', 'more', 'below', 'be', 'it', "wasn't", 'just', "aren't", 'that', 'so', 'we', 'on', 'doing', "you'll", 'now', 'himself', 'being', 'an', 'mightn', 'once', 'will', 'such', 'both', 't', "shan't", "hasn't", 'what', 'you', 'those', 'the', 'll', 'she', 'with', 'into', 'of', 'haven', 'isn', "shouldn't", 'during', 'ain', 'whom', 'between', "won't", "mustn't", 'further', 've', 'but', 'yourself', 'me', 'after', "it's", 'about', 's', 'they', 'itself', 'no', 'there', 'doesn', 'by', 'this', 'too', 'who', 'under', 'then', 'ma', 'did', 'up', 'has', 'own', 'in', "don't", 'had', 'i', 'weren', 'don', 'am', 'these', 'off', 'how', 'couldn', 'a', 're', 'shan', "didn't", 'wouldn', 'all', "isn't", 'why', 'my', 'your', 'ourselves', "that'll", 'very', 'was', 'are', 'until', 'he', 'while', 'them', 'through', 'again', 'over', 'here', "haven't", 'or', 'myself', 'same', 'hasn', "couldn't", 'her', 'when', 'some', 'before', "doesn't", 'mustn', "wouldn't", 'not', 'shouldn', 'd', 'yourselves', 'is', 'our', 'y', 'needn', 'hers', 'as', 'aren', 'themselves', 'each', "hadn't", "should've", 'didn', 'their', 'herself', 'above', 'other'}
ref = {0: 'AJNR. American journal of neuroradiology',
 1: 'Acta Biomed',
 2: 'Am J Infect Control',
 3: 'Am J Trop Med Hyg',
 4: 'Arch Virol',
 5: 'BMC Infect Dis',
 6: 'BMC Public Health',
 7: 'BMJ',
 8: 'BMJ Open',
 9: 'BMJ case reports',
 10: 'BMJ open',
 11: 'Cell',
 12: 'Chaos Solitons Fractals',
 13: 'Chest',
 14: 'Clin Infect Dis',
 15: 'Clin Microbiol Infect',
 16: 'Clin. infect. dis',
 17: 'Computational Science - ICCS 2020',
 18: 'Computational Science and Its Applications - ICCSA 2020',
 19: 'Crit Care',
 20: 'Cureus',
 21: 'Diabetes Metab Syndr',
 22: 'Disaster Med Public Health Prep',
 23: 'Disaster medicine and public health preparedness',
 24: 'Emerg Infect Dis',
 25: 'Environ Res',
 26: 'Epidemiol Infect',
 27: 'Front Immunol',
 28: 'Front Med (Lausanne)',
 29: 'Front Microbiol',
 30: 'Front Pharmacol',
 31: 'Front Psychiatry',
 32: 'Front Psychol',
 33: 'Front Public Health',
 34: 'Frontiers in Psychology',
 35: 'Healthcare (Basel)',
 36: 'Heliyon',
 37: 'Infect Genet Evol',
 38: 'Int J Environ Res Public Health',
 39: 'Int J Infect Dis',
 40: 'Int J Mol Sci',
 41: 'Int. j. environ. res. public health (Online)',
 42: 'International Journal of Environmental Research and Public Health',
 43: 'J Biomol Struct Dyn',
 44: 'J Clin Med',
 45: 'J Clin Virol',
 46: 'J Infect',
 47: 'J Infect Dis',
 48: 'J Infect Public Health',
 49: 'J Korean Med Sci',
 50: 'J Med Internet Res',
 51: 'J Med Virol',
 52: 'J. med. virol',
 53: 'JAMA Netw Open',
 54: 'JMIR Public Health Surveill',
 55: 'Journal of clinical microbiology',
 56: 'Journal of medical virology',
 57: 'Journal of neurointerventional surgery',
 58: 'Journal of virology',
 59: 'Lancet',
 60: 'MMWR Morb Mortal Wkly Rep',
 61: 'Med Hypotheses',
 62: 'Medicine (Baltimore)',
 63: 'Molecules',
 64: 'Nat Commun',
 65: 'Nature',
 66: 'New Scientist',
 67: 'Nutrients',
 68: 'Open Forum Infect Dis',
 69: 'PLoS One',
 70: 'PLoS Pathog',
 71: 'Pan Afr Med J',
 72: 'Pathogens',
 73: 'PeerJ',
 74: 'PloS one',
 75: 'Proc Natl Acad Sci U S A',
 76: 'Proceedings of the National Academy of Sciences of the United States of America',
 77: 'Psychiatry Res',
 78: 'SN Compr Clin Med',
 79: 'Sci Rep',
 80: 'Sci Total Environ',
 81: 'Science',
 82: 'Scientific reports',
 83: 'Sensors (Basel)',
 84: 'Stroke',
 85: 'Surgical endoscopy',
 86: 'Sustainability',
 87: 'The Journal of general virology',
 88: 'Thorax',
 89: 'Trials',
 90: 'Vaccine',
 91: 'Vaccines (Basel)',
 92: 'Vet Microbiol',
 93: 'Virol J',
 94: 'Virology',
 95: 'Virus Research',
 96: 'Viruses',
 97: 'bioRxiv',
 98: 'medRxiv',
 99: 'medRxiv : the preprint server for health sciences'}

def pred(query):
    print("QUERY: ", query)
    K.clear_session()
    data=word_tokenize(query)
    data=[word for word in data if not word in stopwords  and  word.isalnum()]
    data=' '.join(data)
    query=data
    input_=[query]

    #%%
    input_data=tokenizer.texts_to_sequences(input_)
    input_data=pad_sequences(input_data,maxlen=1000)
    input_data = input_data.reshape(1, 1000)
    
    print(input_data.shape)
    pre=model.predict([input_data])[0]
    #%%
    ans = []
    pre = pre.argsort()[-5:][::-1]
    print(pre)
    for rank, idx in enumerate(pre):
        ans.append([rank, ref[idx]])

    prediction = dict({'result':ans})

    return prediction

from tensorflow.keras import layers#, Sequential
from tensorflow.keras.models import Model

main_input = layers.Input(shape=(1000,),dtype='float64')
embedder = layers.Embedding(109843 + 1, 300, input_length=1000)
embed = embedder(main_input)
cnn1 = layers.Conv1D(256, 3, padding='same', strides=1, activation='relu')(embed)
cnn1 = layers.MaxPooling1D(pool_size=47)(cnn1)
cnn2 = layers.Conv1D(256, 4, padding='same', strides=1, activation='relu')(embed)
cnn2 = layers.MaxPooling1D(pool_size=47)(cnn2)
cnn3 = layers.Conv1D(256, 5, padding='same', strides=1, activation='relu')(embed)
cnn3 = layers.MaxPooling1D(pool_size=46)(cnn3)
cnn = layers.concatenate([ cnn1,cnn2, cnn3], axis=-1)
flat = layers.Flatten()(cnn)
drop = layers.Dropout(0.5)(flat)
main_output = layers.Dense(100, activation='softmax')(drop)
model = Model(inputs=main_input, outputs=main_output)

storage_client = storage.Client()
bucket = storage_client.bucket('source-code-tm')
blob = bucket.blob('weight.hdf5')
blob.download_to_filename('/tmp/weight.hdf5')
model.load_weights('/tmp/weight.hdf5')
app.logger.info('Loaded')

@app.route('/', methods=['GET', 'POST'])
#@cross_origin(supports_credentials = True)
def index():
    return app.send_static_file('index.html')
    
@app.route("/favicon.ico")
def favicon():
    return "", 200

@app.errorhandler(404)
#@cross_origin(supports_credentials = True)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/predict', methods=['GET', 'POST'])
#@cross_origin(supports_credentials = True)
def home():
    app.logger.info('Action Initiated')
    review = request.json['review']
    print(review)
    app.logger.info('Reviewed')
    prediction = pred(review)
    app.logger.info('Predicted')
    return prediction

if __name__ == '__main__':
    app.run()
