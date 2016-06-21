enum EventoTipo {
  Obrigatorio,
  Facultativo,
  Viagem
}

enum EventoSituacao {
  SemConvite,
  SemResposta,
  Vai,
  NaoVai
}

export function voluntarioLogado() {
  return {
    RG: {
      realizadas: 7,
      presencas: 6,
      faltas: 1,
      atendimentos: 5
    },
    RGV: {
      realizadas: 3,
      presencas: 2,
      faltas: 1
    },
    agenda: [
      {
        inicio: new Date(2016, 5, 23, 15, 0, 0),
        fim: new Date(2016, 5, 23, 19, 0, 0),
        descricao: 'Próximo plantão: P15/5',
        tipo: EventoTipo.Obrigatorio,
        situacao: EventoSituacao.Vai
      },
      {
        inicio: new Date(2016, 5, 26, 8, 0, 0),
        fim: new Date(2016, 5, 26, 11, 0, 0),
        descricao: 'RGV',
        tipo: EventoTipo.Obrigatorio,
        situacao: EventoSituacao.Vai
      },
      {
        inicio: new Date(2016, 6, 13, 19, 0, 0),
        fim: new Date(2016, 6, 13, 21, 0, 0),
        descricao: 'Reunião do grupo 4',
        tipo: EventoTipo.Obrigatorio,
        situacao: EventoSituacao.Vai
      }
    ]
  }
}

export function lista_voluntarios() {
  var doc = `
Agnelo
06
3280- 3653
3533-2124
9128-1310
agnelo.brito@embrapa.br
24/08
Alfredo
04
3246-0109

9971-9186
jagsgeo@bol.com.br
08/09
Alexandre
28
8592-7395
3215-8886
8416-4741
homemdemelo2004@homail.com
28/11
Ana
33

4012-5200
8593-1328
anefrenk@gmail.com
20/01
Alessandra
39
3922-5859

65-99710101
samnuness@hotmail.com
30/04
Amorim
37
3278-8643


Soniams6@hotmail.com
30/09
Adriano
42


8141-2139
Adriano.santos.bm@gmail.com
13/02
Amanda
44

9860-2945
8238-0928
amandaanut@hotmail.com
22/06
Antonio
45


9178-3021
Carmo.jesus@gmail.com
19/07
Carlos
14
9459-1776

9996-9222
carlosalexandre.gyn@gmail.com
14/05
Cida
29

3537-4268
9103-3326
cidaprofissional66@hotmail.com
07/12
Cleusa
16
3256-4190

9241-0244
cleusadaf@yahoo.com.br
11/02
Cristina
17

8192-4479
8418-3864
otm_tina3@yahoo.com.br
18/04
Dayse
10
3284-9748

92856229
dayse_anjus@hotmail.com
16/09
Daniel
18
3259-2610

8225-1133
danielaugustoribeiro@hotmail.com
16/03
DeJé
15
3229- 3507

9979- 4746
mjesusdfurtado@hotmail.com
19/06
Elieth
40


9971-1316
eliethslin@hotmail.com
12/07
Hamira
05
3246-0109

9975-1650

25/01
Ilma
08
3086-6931


ilmamima@hotmail.com
29/05
Jane
32
8224-9732

3642-0094
liiamorales@gmail.com
29/07
Joao
02
3286-5158
3230-7500
9980-9028
joaodecastrotorres@yahoo.com.br
26/07
Juliene
19
9277-0118

8504-5199
Jullye14@hotmail.com
14/10
José Fernando
34


8113-0639
josefernandotolentino@gmail.com
18/07
Kiyoko
13
3212-0928

8151-9141
kiyoko_matsumoto@terra.com.br
20/10
Lenita
12

8186-1870
8595-5256
lenitaelena@hotmail.com
04/12
Lilian
30
9611-7755
3219-5100
9208-7155
ilian-silva@hotmail.com
24/02
Luis
35


8107-2111
lcpellissari@terra.com.br
09/02
Marcia
31

3201-1029
8150-8512
marcelia.queiroga@gmail.com
17/09
Marcos
07

t-8309-0571
9955-4441
martrccos@hotmail.com
25/08
Maria Afonsa
01
3225-4217
3227-2823
8146-8638
afonsasilva12@hotmail.com
12/11
Maria Sueli
23
3091-2665
3521-1160
8118-9570
aguiamarias@gmail.com
08/10
Marilu
24
3942-0115
3281-2166
8501-4756
chagasmarilu@gmail.com
10/10
Mario
11
3241-6305

9972-6305
carasul@terra.com.br
16/09
Marly
20
3269-8390

8477-0497
marlypedrosa@gmail.com
03/03
Mary
09
3281-5409

8164-6674
mary12feliz@bol.com.br
19/08
Messias
21
85631806 oi
82883662 tim
9954-9555 v
Jesus42jesus@hotmail.com
04/04
Marilia
41
3609-3883

8244-9000
carmensleao@gmail.com
02/02
Magda
43
3095-2385

8485-4040
magdahel@globo.com
17/10
Norma
38
8159-3026 V
9359-2015 C
9236-8586 T
normamarcia@gmail.com
17/07
Rocha
22
3233-4620

9213-2417
Jdarcy68@hotmail.com
01/05
Rosana
26


8212-8626
ro-m-santo@gmail.com
17/02
Tania
28

8218-0475
8412-0799
thaniapidde@hotmail.com
06/08
Tavares
26
3313-6294

8423-8298
parafixadeia@hotmail.com
31/12
Valmer
03
3588-3335

9251-6830
hansvam7@hotmail.com
30/04
Valeria
37
3088-6411


valeriaribeiro09@hotmail.com
11/09`.split('\n');

  var res = [];

  for (var i = 1; i<doc.length;i += 7)
  {
    var nome = doc[i].trim();
    if (!/^[ a-zé]+$/gi.test(nome)) erro('nome', nome)
    var codigo = doc[i+1]
    if (!/\d+$/gi.test(codigo)) erro('codigo', codigo)
    var telres = doc[i+2].trim()
    var telcom = doc[i+3].trim()
    var celular = doc[i+4].trim()
    var email = doc[i+5].trim()
    if (email && !/^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/gi.test(email)) erro('email', email)
    var aniv = doc[i+6].trim()
    if (!/\d\d\/\d\d$/gi.test(aniv)) erro('aniv', aniv)
    res.push({
      nome,
      codigo,
      telres,
      telcom,
      celular,
      email,
      aniv,
      whatsapp() {
        return celular;
      },
      telefone() {
        return telres;
      }
    })
    // console.log(i, nome, codigo, celular, email, aniv);
  }

  return res;
  function erro(msg, val) {
    console.log(msg, '[', val, ']', i)
    console.log(res)
    console.log(doc)
    debugger
    throw msg
  }
}
