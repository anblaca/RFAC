i = 0
f = open('corpus.tok.es','w')
s = open('corpus.Valtok.es','w')

with open('corpus.tokk.es', 'r') as fichero:
    for linea in fichero.readlines():
        if i < 46000:
        	f.write(linea)
        else:
        	s.write(linea)
        i +=1

j = 0
a = open('corpus.tok.en','w')
b = open('corpus.Valtok.en','w')

with open('corpus.tokk.en', 'r') as fichero:
    for linea in fichero.readlines():
        if j < 46000:
        	a.write(linea)
        else:
        	b.write(linea)
        j +=1
