from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import audioread


from rest_framework.decorators import api_view

import glob,os,librosa
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.pyplot import specgram
import soundfile as sf
import tensorflow as tf
import plotly.graph_objects as go

#model that i have creted..
new_model = tf.keras.models.load_model("speakwise/utils/my_model.h5")

@csrf_exempt
def data_return(request):
    def feature_extraction2(file_name):
        X , sample_rate = librosa.load(file_name, sr=None) #Can also load file using librosa
        print(X,sample_rate)
        if X.ndim > 1: # ndim id number of array dimensions
            X = X[:,0]
        X = X.T
        
        ## stFourier Transform
        stft = np.abs(librosa.stft(X))
                
        mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=20).T, axis=0) #Returns N_mel coefs
        rmse = np.mean(librosa.feature.rms(y=X).T, axis=0) #RMS Energy for each Frame (Stanford's). Returns 1 value 
        spectral_flux = np.mean(librosa.onset.onset_strength(y=X, sr=sample_rate).T, axis=0) #Spectral Flux (Stanford's). Returns 1 Value
        zcr = np.mean(librosa.feature.zero_crossing_rate(y=X).T, axis=0) #Returns 1 value
        
        #mel = np.mean(librosa.feature.melspectrogram(X, sr=sample_rate).T, axis=0) #Returns 128 values
        #chroma = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T, axis=0) #Returns 12 values
        #contrast = np.mean(librosa.feature.spectral_contrast(S=stft, sr=sample_rate).T, axis=0) #Returns 7 values
        #tonnetz = np.mean(librosa.feature.tonnetz(y=librosa.effects.harmonic(X), sr=sample_rate).T, axis=0) #tonal centroid features Returns 6 values
        
        ##Return computed audio features
        return mfccs, rmse, spectral_flux, zcr



    def prediction(fname):
        file_name=fname
        mfccs, rmse, spectral_flux, zcr = feature_extraction2(file_name)
        #print(mfccs,rmse,spectral_flux,zcr)

        # extracted_features = np.hstack([mfccs, rmse, spectral_flux, zcr])

        # pp2=extracted_features.reshape(1,-1)#reshaping..

        # c=new_model.predict(pp2)

        # values = c
        index_max = 1
        return(index_max)

    def visualize(l2,dd):
        l3=l2
        d=dd
        #if n==0:
            #l=[{'range': [0, 1], 'color': 'red'}]
        fig = go.Figure(go.Indicator(
        mode = "gauge",
        #value = "beginner",
        domain = {'x': [0, 1], 'y': [0, 1]},
        title=d,
        #title = {'text': "English Fluency level", 'font': {'size': 24}},
        #delta = {'reference': 400, 'increasing': {'color': "RebeccaPurple"}},
        gauge = {
            'axis': {'range': [None, 3], 'tickwidth': 1, 'tickcolor': "darkblue"},
            #'bar': {'color': "darkblue"},
            'bgcolor': "white",
            'borderwidth': 2,
            'bordercolor': "gray",
            'steps':l3,
                
            
            }))

        fig.show()
        fig.write_image('flu.png')

    # audio_file = request.FILES['audio_file']
    # filename = 'audio.wav'
    # # im.show()
    # filepath = os.path.join('static/speakwise', filename)
    # with open(filepath, 'wb') as destination:
    #     for chunk in audio_file.chunks():
    #         destination.write(chunk)

    n=prediction("D:\Projects\Ishaan-App\speakwise\output.mp3")
    # print(librosa.__version__)
    # if n==0:
    #     visualize([{'range': [0, 1], 'color': 'red'}],{'text': "English Fluency on Beginner level", 'font': {'size': 30}})
    # elif n==1:
    #     visualize([{'range': [0, 1], 'color': 'red'},{'range': [1, 2], 'color': 'yellow'}],{'text': "English Fluency on Intermediate level", 'font': {'size': 30}})
    # else:
    #     visualize([{'range': [0, 1], 'color': 'red'},{'range': [1, 2], 'color': 'yellow'},{'range': [2, 3], 'color': 'green'}],{'text': "English Fluency on Advanced level", 'font': {'size': 30}})

    return HttpResponse("yes")

# def upload_audio(request):
#     if request.method == 'POST':
#         audio_file = request.FILES['audio_file']
#     # Process the audio file here
#         return HttpResponse('OK')
#     else:
#         return HttpResponseNotAllowed(['POST'])




