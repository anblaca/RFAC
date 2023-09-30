i = 0
f = open('corpus.tok.es','w')
s = open('corpus.Valtok.es','w')

with open('corpus.tokk.es','r') as fichero:
    for linia in fichero.readlines():
        if i < 45500:
            f.write(linia)
        else:
            s.write(linia)
        i+=1

j = 0
a = open('corpus.tok.en','w')
b = open('corpus.Valtok.en','w')

with open('corpus.tokk.en','r') as fichero:
    for linia in fichero.readlines():
        if i < 45500:
            a.write(linia)
        else:
            b.write(linia)
        j+=1
