import { Doctrine } from '../types';

export const DOCTRINES: Doctrine[] = [
  {
    id: 1,
    nome: 'As Escrituras Sagradas',
    texto: `As Escrituras Sagradas, compostas pelo Antigo e Novo Testamentos, são a Palavra escrita de Deus, dada por inspiração divina. Os homens santos de Deus falaram movidos pelo Espírito Santo, expressando os pensamentos, a vontade e a salvação que Deus desejava comunicar à humanidade.

A inspiração das Escrituras não deve ser entendida como ditação mecânica, que suprime a personalidade do escritor. Antes, a mente e a vontade divinas foram harmonizadas com a mente e a vontade humanas; as declarações são do homem, mas, sob a influência do Espírito Santo, são a autêntica Palavra de Deus. As Escrituras constituem a revelação infalível da vontade de Deus, o padrão supremo de caráter, o revelador da doutrina e o teste de toda a experiência.

A palavra grega "theopneustos" (II Tm 3:16), traduzida como "inspirada por Deus", significa literalmente "proveniente do fôlego de Deus". Tal afirmação estabelece que a Bíblia não é produto da iniciativa humana, mas nasce da ação criadora e reveladora do próprio Deus. A autoridade e a singularidade da Bíblia emanam de sua origem divina e do assunto central de que trata: Jesus Cristo e Seu plano de salvação para a humanidade.

O Espírito Santo, que inspirou os escritores, é o mesmo que ilumina a mente do leitor para que compreenda e aplique a mensagem divina. Portanto, o estudo da Bíblia deve sempre ser acompanhado de oração e submissão ao Espírito, pois as coisas de Deus são discernidas espiritualmente. A Bíblia é o critério máximo pelo qual todo ensinamento, toda experiência e toda prática religiosa devem ser julgados.`,
    perguntas: [
      {
        id: 101,
        categoria: 'certa',
        enunciado: 'De acordo com o livro "Nisto Cremos", de onde emana a autoridade e a singularidade da Bíblia?',
        opcoes: [
          'a) De suas incomparáveis influências políticas e sociais no mundo ocidental.',
          'b) De sua origem divina e do assunto central de que trata: Jesus Cristo.',
          'c) Do fato de ter sido escrita inteiramente pela própria mão de Deus no Sinai.',
          'd) Da sofisticação literária e retórica dos profetas que a redigiram.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 102,
        categoria: 'certa',
        enunciado: 'O texto de II Timóteo 3:16 afirma que "Toda a Escritura é divinamente inspirada". O que essa declaração implica para a autoridade dos 66 livros bíblicos?',
        opcoes: [
          'a) Que apenas os livros escritos por apóstolos possuem plena autoridade divina.',
          'b) Que todos os livros canônicos possuem igual autoridade, pois todos emanam do mesmo Deus.',
          'c) Que a inspiração se restringe às doutrinas, mas não às questões históricas e científicas.',
          'd) Que a autoridade bíblica é condicional e depende da confirmação pela razão humana.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 103,
        categoria: 'certa',
        enunciado: 'De acordo com "Nisto Cremos", qual é a relação correta entre a Bíblia e o Espírito Santo para a vida do crente?',
        opcoes: [
          'a) O Espírito Santo substituiu a necessidade de estudar a Bíblia para os crentes do Novo Testamento.',
          'b) A Bíblia foi dada pelo Espírito Santo e é por Ele que ela deve ser compreendida e aplicada.',
          'c) O Espírito Santo apenas confirma as interpretações das autoridades eclesiásticas.',
          'd) A iluminação do Espírito Santo supera a autoridade do texto escrito em questões de fé.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 111,
        categoria: 'incorreta',
        enunciado: 'Sobre o processo de Inspiração das Escrituras e a atuação dos profetas, assinale a alternativa teologicamente INCORRETA:',
        opcoes: [
          'a) A palavra grega "theopneustos" significa literalmente "proveniente do fôlego de Deus".',
          'b) Genuína inspiração oblitera por completo a razão humana, a integridade personalística e a individualidade do profeta, transformando-o em uma mera pena passiva.',
          'c) Os homens — e não as palavras — foram os instrumentos inspirados sob a influência do Espírito Santo.',
          'd) A variedade de estilos e termos nos livros da Bíblia é um reflexo direto da educação e da cultura dos diferentes autores humanos.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 112,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a natureza da Bíblia Sagrada:',
        opcoes: [
          'a) As Escrituras revelam com fidelidade o caráter, os propósitos e a vontade de Deus.',
          'b) A Bíblia é o padrão supremo pelo qual todo ensinamento e experiência deve ser julgado.',
          'c) A Bíblia perde sua autoridade quando contradiz consensos científicos estabelecidos pela comunidade acadêmica.',
          'd) O Novo Testamento apresenta a plenitude da revelação do plano de salvação em Jesus Cristo.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 116,
        categoria: 'vf',
        enunciado: 'A Bíblia ensina que existe inspiração parcial ou graus de inspiração entre os seus livros, o que permite ao leitor escolher quais partes possuem autoridade divina.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O livro afirma taxativamente que a Bíblia não ensina inspiração parcial ou graus de inspiração; isso é especulação humana.',
      },
      {
        id: 117,
        categoria: 'vf',
        enunciado: 'É correto afirmar que os escritores bíblicos foram simples secretários que anotaram mecanicamente as palavras ditadas por Deus, sem qualquer participação de suas personalidades ou estilos.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O modelo adventista de inspiração rejeita a ditação mecânica. O Espírito Santo guiou os pensamentos e expressões dos escritores, preservando sua individualidade — por isso vemos diferentes estilos literários na Bíblia.',
      },
      {
        id: 121,
        categoria: 'apologetica',
        enunciado: 'Um colega de faculdade afirma: "A Bíblia foi escrita por homens e reflete apenas os limites intelectuais da época deles. Deus não pode estar associado a um livro tão humano." Com base no livro, como você defende a autoridade bíblica?',
        opcoes: [
          'a) Argumentando que os escritores foram totalmente passivos, como fantoches.',
          'b) Explicando que a mente e a vontade divinas foram combinadas com a mente e a vontade humanas; as declarações são do homem, mas, sob a influência do Espírito, são a autêntica Palavra de Deus.',
          'c) Afirmando que a Bíblia não é humana, pois todas as suas páginas caíram prontas diretamente do céu.',
          'd) Cedendo ao argumento, dizendo que apenas os Dez Mandamentos possuem autoridade real.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 2,
    nome: 'A Trindade',
    texto: `Existe um só Deus: Pai, Filho e Espírito Santo, uma unidade de três Pessoas coeternas. Deus é imortal, onipotente, onisciente, superior a tudo e onipresente. Ele é infinito e incompreensível pela mente humana em sua plenitude, mas Se revelou de forma compreensível através das Escrituras e de Seu Filho encarnado.

A Trindade não é uma contradição, mas um mistério glorioso que revela a natureza relacional de Deus. O Pai, o Filho e o Espírito Santo são distintos em Pessoa, mas compartilham a mesma essência divina, os mesmos atributos e a mesma glória. Cada Pessoa da Trindade desempenha um papel específico na criação, na redenção e na santificação da humanidade, atuando sempre em perfeita harmonia e unidade de propósito.

A doutrina da Trindade distingue o monoteísmo cristão tanto do politeísmo pagão quanto do unitarismo, que nega a divindade do Filho e do Espírito. Ela fundamenta a compreensão de que "Deus é amor" (1 Jo 4:8), pois o amor pressupõe relacionamento, e a Trindade é, em Si mesma, uma comunidade eterna de amor perfeito.`,
    perguntas: [
      {
        id: 201,
        categoria: 'certa',
        enunciado: 'Sobre a doutrina da Trindade, qual afirmação está correta?',
        opcoes: [
          'a) As três Pessoas da Trindade são manifestações distintas de um único Ser pessoal, alternando entre Pai, Filho e Espírito.',
          'b) O Pai, o Filho e o Espírito Santo são três Pessoas coeternas e coiguais que compartilham a mesma essência divina.',
          'c) O Filho e o Espírito são seres criados pelo Pai para auxiliá-lo na administração do universo.',
          'd) A Trindade é uma realidade administrativa: Deus é um único Ser que se relaciona de três formas diferentes.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 202,
        categoria: 'certa',
        enunciado: 'Em que texto das Escrituras Jesus instrui Seus discípulos a batizarem em nome da Trindade?',
        opcoes: [
          'a) João 3:16 — "Porque Deus amou o mundo de tal maneira..."',
          'b) Mateus 28:19 — "batizai-os em nome do Pai, do Filho e do Espírito Santo"',
          'c) Atos 2:38 — "Arrependei-vos e batizai-vos cada um de vós..."',
          'd) Romanos 8:15 — "Vós recebestes o espírito de adoção"',
        ],
        resposta_correta: 'b',
      },
      {
        id: 203,
        categoria: 'certa',
        enunciado: 'O que a doutrina da Trindade ensina sobre a unidade e diversidade em Deus?',
        opcoes: [
          'a) Que existe diversidade de essência mas unidade de propósito entre as três Pessoas divinas.',
          'b) Que as três Pessoas são idênticas em tudo, não havendo distinção real entre elas.',
          'c) Que há uma única essência divina compartilhada por três Pessoas eternamente distintas.',
          'd) Que a unidade trinitária é um mistério que não admite qualquer compreensão racional.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 204,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a Trindade:',
        opcoes: [
          'a) O Pai, o Filho e o Espírito Santo são coiguais em divindade, poder e glória.',
          'b) O modalismo afirma que Deus é um único Ser que Se manifesta de três modos diferentes — doutrina rejeitada pelo adventismo.',
          'c) O Filho e o Espírito Santo são subordinados ao Pai em essência e natureza divina, não apenas em função.',
          'd) A Trindade fundamenta a afirmação de que "Deus é amor", pois o amor pressupõe relacionamento eterno.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 205,
        categoria: 'incorreta',
        enunciado: 'Sobre a natureza das três Pessoas divinas, assinale a alternativa INCORRETA:',
        opcoes: [
          'a) O Espírito Santo é uma Pessoa divina, não uma força impessoal ou energia cósmica.',
          'b) Jesus Cristo como Filho eterno de Deus existia antes de Sua encarnação.',
          'c) A Trindade ensina que existem três deuses distintos que cooperam para a salvação humana.',
          'd) O Pai, o Filho e o Espírito Santo atuam em perfeita harmonia e unidade de propósito.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 206,
        categoria: 'vf',
        enunciado: 'A doutrina adventista da Trindade afirma que há três deuses que colaboram entre si, o que pode ser classificado como uma forma de politeísmo cristão.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo afirma um monoteísmo trinitário: existe um só Deus em três Pessoas coeternas. Isso não é politeísmo, pois as três Pessoas compartilham a mesma essência divina e unidade de ser.',
      },
      {
        id: 207,
        categoria: 'apologetica',
        enunciado: 'Um amigo diz: "A Trindade é uma contradição: como 3 pode ser 1?" Como você responde biblicamente?',
        opcoes: [
          'a) Concorda que é contraditório, mas aceita como dogma irracional que deve ser crido sem questionar.',
          'b) Explica que a Trindade não afirma que 3 = 1 no mesmo sentido: há um Deus em três Pessoas distintas, não três deuses nem um Deus em três máscaras.',
          'c) Diz que a Trindade é uma doutrina medieval inventada e que a Bíblia não a ensina.',
          'd) Argumenta que a Trindade é uma verdade oculta reservada para cristãos maduros.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 3,
    nome: 'Deus Pai',
    texto: `Deus, o Pai eterno, é o Criador, o Sustentador e o Soberano de toda a criação. Ele é perfeito em bondade, sabedoria, poder e amor; pleno de graça e misericórdia, lento para a ira e transbordante de amor fiel. Os atributos de Deus revelados nas Escrituras formam um retrato coerente de um Pai que se relaciona pessoalmente com Sua criação.

O Pai enviou Seu único Filho como expressão suprema do amor divino pela humanidade perdida. Em Jesus Cristo, vemos o caráter do Pai manifestado em termos humanos. A missão de Cristo foi revelar o Pai e reconciliar a humanidade com Ele. "Quem me viu, viu o Pai" (Jo 14:9).

Como Pai, Deus mantém uma relação de amor e cuidado com toda a humanidade, e em especial com aqueles que, pelo novo nascimento, tornaram-se filhos adotivos por meio de Jesus Cristo. A oração é o canal pelo qual os filhos se comunicam com o Pai, e a providência divina cuida de todas as necessidades de quem confia nEle.`,
    perguntas: [
      {
        id: 301,
        categoria: 'certa',
        enunciado: 'Qual das afirmações abaixo descreve corretamente o caráter de Deus Pai conforme as Escrituras?',
        opcoes: [
          'a) Deus Pai é primariamente um juiz severo cuja ira pode ser aplacada pelo sacrifício de Cristo.',
          'b) Deus Pai é eternamente bom, justo, misericordioso e amoroso, revelado plenamente em Jesus Cristo.',
          'c) O Pai é distante e inacessível, tendo delegado toda a obra redentora exclusivamente ao Filho.',
          'd) O caráter do Pai no Antigo Testamento é de ira, enquanto no Novo Testamento é de amor.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 302,
        categoria: 'certa',
        enunciado: 'Qual é a relação entre conhecer Jesus e conhecer o Pai, segundo o Evangelho de João?',
        opcoes: [
          'a) São revelações distintas: Jesus revela a graça, o Pai revela a lei e o julgamento.',
          'b) Quem vê Jesus em Seus ensinamentos e caráter está vendo a perfeita revelação do Pai.',
          'c) O Filho é superior ao Pai em misericórdia, enquanto o Pai é mais severo em juízo.',
          'd) Não há relação direta: o Pai permanece inacessível mesmo após a encarnação do Filho.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 303,
        categoria: 'certa',
        enunciado: 'Qual dos atributos abaixo descreve corretamente Deus Pai?',
        opcoes: [
          'a) Finito — Deus aprendeu e cresceu com as experiências de governar o universo.',
          'b) Parcialmente onisciente — Deus conhece o passado e o presente, mas o futuro é aberto.',
          'c) Onipotente, onisciente e onipresente — sem limitações inerentes de poder, conhecimento ou presença.',
          'd) Mutável — o caráter de Deus evolui conforme a história da redenção avança.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 304,
        categoria: 'incorreta',
        enunciado: 'Sobre Deus Pai, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) Deus Pai é a fonte de toda a existência, criando e sustentando o universo por Sua vontade.',
          'b) O Pai Se preocupa e cuida ativamente de cada ser humano com amor paternal.',
          'c) A missão do Pai é exclusivamente punir o pecado, enquanto o Filho é o único Deus de amor.',
          'd) O Pai enviou Seu Filho como expressão suprema de Seu amor redentor pela humanidade.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 305,
        categoria: 'incorreta',
        enunciado: 'Identifique a descrição INCORRETA de Deus Pai:',
        opcoes: [
          'a) Ele é onisciente — conhece todas as coisas passadas, presentes e futuras.',
          'b) Ele é onipotente — Seu poder não tem limites, podendo realizar tudo consistente com Seu caráter.',
          'c) Deus Pai é um ser finito que Se aperfeiçoa através de Suas experiências com a criação.',
          'd) Ele é eterno — existindo além e antes do tempo criado, sem começo nem fim.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 306,
        categoria: 'vf',
        enunciado: 'O Deus Pai do Antigo Testamento é fundamentalmente diferente do Deus revelado por Jesus, sendo o primeiro um Deus de ira e o segundo um Deus de amor.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'As Escrituras revelam um único Deus consistente. O Antigo Testamento apresenta Deus como "misericordioso e piedoso, tardio em irar-se" (Êx 34:6). Jesus afirma: "quem me viu, viu o Pai" (Jo 14:9). O caráter divino é imutável.',
      },
      {
        id: 307,
        categoria: 'apologetica',
        enunciado: 'Um colega argumenta: "Se Deus é Pai amoroso, por que permite tanto sofrimento no mundo?" Como você responde biblicamente?',
        opcoes: [
          'a) Diz que Deus não tem controle sobre os eventos naturais e humanos, apenas observa.',
          'b) Reconhece a tensão e explica que o sofrimento existe por causa do livre-arbítrio e do Grande Conflito, mas que Deus sofre conosco e trabalhará para restaurar todas as coisas.',
          'c) Afirma que todo sofrimento é punição direta de Deus pelos pecados individuais.',
          'd) Sugere ignorar a pergunta, pois ela é desnecessariamente filosófica e não prática.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 4,
    nome: 'Deus o Filho',
    texto: `Jesus Cristo é o eterno Filho de Deus, o Verbo que estava com Deus e era Deus desde a eternidade. Por Ele e para Ele foram criadas todas as coisas. Na plenitude do tempo, Ele Se encarnou, tomando sobre Si a natureza humana por meio do nascimento virginal, sem deixar de ser plenamente divino.

Em Jesus Cristo estão unidos, de modo perfeito e inseparável, a divindade e a humanidade. Ele viveu uma vida perfeitamente obediente à vontade do Pai, resistindo a todas as tentações e cumprindo toda a justiça em nosso lugar. Sua morte expiatória na cruz é o fundamento da redenção — por ela, o pecado é perdoado e a reconciliação com Deus é possível. Sua ressurreição corporal é a garantia da nossa futura ressurreição.

Cristo ascendeu ao céu, onde intercede por nós como nosso Sumo Sacerdote no santuário celestial. Ele é o único Mediador entre Deus e os homens. O seu retorno em glória é a esperança viva de todos os que creem, quando Ele virá para buscar os Seus redimidos e estabelecer Seu reino eterno.`,
    perguntas: [
      {
        id: 401,
        categoria: 'certa',
        enunciado: 'O que a doutrina adventista afirma sobre a preexistência de Jesus Cristo?',
        opcoes: [
          'a) Jesus passou a existir no momento em que foi gerado pelo Pai, não sendo, portanto, eterno.',
          'b) Jesus Cristo existia desde a eternidade, sendo o Verbo que estava com Deus e era Deus antes da criação.',
          'c) A preexistência de Jesus é apenas uma metáfora poética sobre Seu papel nos planos eternos de Deus.',
          'd) Jesus existia como anjo superior antes de Sua encarnação, sendo criado antes de tudo mais.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 402,
        categoria: 'certa',
        enunciado: 'Qual é o significado central da encarnação de Jesus Cristo?',
        opcoes: [
          'a) Que Deus abandonou Sua natureza divina para assumir temporariamente uma forma humana.',
          'b) Que o Filho eterno assumiu a natureza humana sem deixar de ser plenamente divino, unindo as duas naturezas em uma única Pessoa.',
          'c) Que Jesus era um ser humano excepcionalmente espiritual ao qual Deus concedeu poderes divinos.',
          'd) Que a encarnação foi necessária apenas para que Jesus pudesse ser um bom exemplo moral.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 403,
        categoria: 'certa',
        enunciado: 'Por que a morte de Cristo na cruz é chamada de expiatória?',
        opcoes: [
          'a) Porque Jesus morreu como mártir para nos ensinar a aceitar o sofrimento com paciência.',
          'b) Porque Cristo pagou o preço do nosso pecado, substituindo o pecador e satisfazendo as exigências da lei divina.',
          'c) Porque a morte de Jesus foi um sacrifício simbólico que demonstra o amor divino sem efeito real sobre o pecado.',
          'd) Porque apenas os que assistiram à crucificação puderam ser expiados pelos seus pecados.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 404,
        categoria: 'incorreta',
        enunciado: 'Sobre a natureza e obra de Jesus Cristo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) Jesus ressuscitou corporalmente ao terceiro dia, garantindo nossa futura ressurreição.',
          'b) Na cruz, Cristo carregou nosso pecado e nossa condenação, tornando-Se nossa redenção.',
          'c) Após a ascensão, Jesus cessou Sua atividade em favor da humanidade, aguardando o retorno.',
          'd) Jesus é o único Mediador entre Deus e os homens (1 Tm 2:5).',
        ],
        resposta_correta: 'c',
      },
      {
        id: 405,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre Jesus Cristo:',
        opcoes: [
          'a) Ele nasceu da virgem Maria, sendo o cumprimento das profecias messiânicas do Antigo Testamento.',
          'b) Jesus viveu uma vida perfeitamente obediente, resistindo a todas as tentações sem cometer nenhum pecado.',
          'c) A divindade de Jesus é apenas funcional — Ele age como Deus, mas não É Deus em essência.',
          'd) Sua ascensão ao céu inaugurou Seu ministério sacerdotal em favor dos que creem nEle.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 406,
        categoria: 'vf',
        enunciado: 'Jesus Cristo deixou de existir entre Sua morte e Sua ressurreição, sendo recriado por Deus ao terceiro dia.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo não ensina que a Pessoa do Filho cessou de existir. A morte de Cristo foi real e envolveu toda a experiência da mortalidade humana, mas a continuidade da Pessoa divina do Filho não foi extinta.',
      },
      {
        id: 407,
        categoria: 'apologetica',
        enunciado: 'Um amigo argumenta: "Jesus foi apenas um grande homem, um profeta moral — não pode ser Deus." Como você defende a divindade de Cristo?',
        opcoes: [
          'a) Concorda que Jesus era apenas humano, mas defende que Seus ensinamentos são de origem divina.',
          'b) Aponta que Jesus afirmou Sua divindade ("Antes que Abraão existisse, EU SOU"), realizou milagres únicos e ressuscitou dos mortos — evidências que demandam uma explicação além de mero profetismo.',
          'c) Diz que a divindade de Jesus é questão de fé subjetiva, não de argumento racional.',
          'd) Argumenta apenas que Jesus era o Filho biológico de Deus por causa do nascimento virginal.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 5,
    nome: 'Deus o Espírito Santo',
    texto: `O Espírito Santo é a terceira Pessoa da Trindade, coeterno e coigual com o Pai e o Filho. Embora Sua personalidade seja mais difícil de compreender, as Escrituras revelam que o Espírito pensa, sente, age e pode ser entristecido, confirmando Sua natureza pessoal e divina.

O Espírito Santo opera de múltiplas formas na experiência humana e da Igreja. Ele convence o mundo de pecado, de justiça e de julgamento. Regenera o coração do pecador arrependido, habitando nele como garantia da herança eterna. Opera a santificação progressiva do crente, produzindo os frutos do Espírito: amor, alegria, paz, paciência, gentileza, bondade, fidelidade, mansidão e domínio próprio.

O Espírito distribui dons espirituais a cada membro da Igreja segundo Sua soberana vontade, para o benefício de todo o corpo de Cristo. Ele inspirou os profetas e apóstolos ao escreverem as Escrituras e ilumina a mente do leitor para compreendê-las. A vida cristã plena é vida no Espírito: guiada, empoderada e transformada pela Terceira Pessoa da Trindade.`,
    perguntas: [
      {
        id: 501,
        categoria: 'certa',
        enunciado: 'O que confirma a natureza pessoal do Espírito Santo, diferenciando-O de uma força impessoal?',
        opcoes: [
          'a) O fato de ser descrito como "vento" em hebraico e grego — forças impessoais da natureza.',
          'b) O fato de as Escrituras descreverem o Espírito como aquele que fala, guia, intercede, e pode ser entristecido — atributos de uma Pessoa.',
          'c) O fato de o Espírito ser onipresente, o que é incompatível com a personalidade.',
          'd) O Espírito Santo é descrito apenas em termos de energia e poder, sem atributos pessoais.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 502,
        categoria: 'certa',
        enunciado: 'Qual é o papel do Espírito Santo na vida do crente, segundo o Novo Testamento?',
        opcoes: [
          'a) O Espírito opera apenas no contexto coletivo da Igreja, não individualmente em cada crente.',
          'b) O Espírito Santo habita no crente, produzindo convicção de pecado, regeneração, santificação e os frutos do Espírito.',
          'c) O papel do Espírito é exclusivamente o de distribuir dons sobrenaturais como línguas e curas.',
          'd) O Espírito Santo é dado apenas aos líderes e ministros ordenados da Igreja.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 503,
        categoria: 'certa',
        enunciado: 'Como o Espírito Santo se relaciona com as Escrituras Sagradas?',
        opcoes: [
          'a) O Espírito Santo substituiu a necessidade das Escrituras para os crentes iluminados.',
          'b) O mesmo Espírito que inspirou os escritores bíblicos ilumina a mente do leitor para compreendê-las.',
          'c) A atuação do Espírito Santo sempre produz revelações novas que superam a autoridade da Bíblia.',
          'd) O Espírito Santo agiu apenas nos tempos bíblicos, sem atuação na era contemporânea.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 504,
        categoria: 'incorreta',
        enunciado: 'Sobre o Espírito Santo, identifique a afirmação INCORRETA:',
        opcoes: [
          'a) O Espírito Santo é coeterno e coigual com o Pai e o Filho.',
          'b) Ele distribui dons espirituais a cada membro da Igreja conforme a Sua vontade soberana.',
          'c) O Espírito Santo pode ser ignorado impunemente, pois Sua influência é apenas sugestiva e jamais real.',
          'd) A blasfêmia contra o Espírito Santo é o pecado irremissível mencionado por Jesus.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 505,
        categoria: 'incorreta',
        enunciado: 'Marque a descrição INCORRETA da obra do Espírito Santo:',
        opcoes: [
          'a) Ele convence o mundo de pecado, de justiça e de juízo (Jo 16:8).',
          'b) O Espírito produz o novo nascimento espiritual no coração do arrependido.',
          'c) O Espírito Santo é inferior ao Pai e ao Filho por ser o terceiro na ordem da Trindade.',
          'd) Ele intercede por nós com gemidos inexprimíveis (Rm 8:26).',
        ],
        resposta_correta: 'c',
      },
      {
        id: 506,
        categoria: 'vf',
        enunciado: 'O Espírito Santo é apenas uma energia ou força divina emanada por Deus, não uma Pessoa com atributos pessoais como vontade, intelecto e emoção.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O Espírito Santo é a terceira Pessoa da Trindade. As Escrituras O descrevem como alguém que fala (Ap 2:7), ensina (Jo 14:26), intercede (Rm 8:26), pode ser entristecido (Ef 4:30) — atributos de uma Pessoa, não de uma força impessoal.',
      },
      {
        id: 507,
        categoria: 'apologetica',
        enunciado: 'Alguém diz: "O Espírito Santo é apenas a presença de Deus ou Sua energia, não uma Pessoa real." Como você responde?',
        opcoes: [
          'a) Concorda, dizendo que "Espírito Santo" é apenas outro nome para Deus Pai quando age no mundo.',
          'b) Mostra que as Escrituras usam pronomes pessoais para o Espírito, descrevem-No como alguém que fala, ensina e pode ser entristecido — atributos que só fazem sentido aplicados a uma Pessoa.',
          'c) Diz que a questão é irrelevante para a prática cristã e deve ser evitada.',
          'd) Argumenta apenas a partir da experiência emocional pessoal com o Espírito.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 6,
    nome: 'A Criação',
    texto: `Deus é o Criador de todas as coisas, e Ele revelou nas Escrituras o relato autêntico de Sua atividade criadora. Em seis dias, Deus fez "o céu e a terra" e tudo o que existe neles, e descansou no sétimo dia, instituindo o Sábado como memorial perpétuo de Sua obra criadora.

A criação da humanidade representou o ápice da obra de Deus: Adão e Eva foram criados à imagem e semelhança de Deus, com individualidade, capacidade para pensar, sentir e escolher. Como seres criados, dependemos totalmente de Deus como nossa fonte de vida, de propósito e de identidade.

A doutrina da criação fundamenta o valor inerente de todo ser humano, o cuidado com o ambiente natural e a santidade do Sábado. Ela nos lembra que não somos produtos de forças cegas e impessoais, mas filhos planejados e amados por um Criador pessoal que nos conhece e sustenta.`,
    perguntas: [
      {
        id: 601,
        categoria: 'certa',
        enunciado: 'O que a doutrina adventista da criação afirma sobre a origem do mundo?',
        opcoes: [
          'a) O universo se formou por processos evolutivos ao longo de bilhões de anos, com a orientação geral de Deus.',
          'b) Deus criou o universo e a vida em seis dias literais de 24 horas, conforme revelado em Gênesis.',
          'c) A criação foi um processo gradual iniciado por Deus, que então se desenrolou por leis naturais autônomas.',
          'd) A história da criação em Gênesis é um mito teológico sem valor histórico literal.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 602,
        categoria: 'certa',
        enunciado: 'Qual é a importância da criação de Adão e Eva à imagem de Deus?',
        opcoes: [
          'a) Que apenas os primeiros humanos tinham valor divino especial; os demais são moralmente inferiores.',
          'b) Que todo ser humano possui dignidade inerente, capacidade moral e relacionamento pessoal com Deus.',
          'c) Que o ser humano é essencialmente divino e pode alcançar a perfeição por seus próprios esforços.',
          'd) Que a imagem de Deus foi completamente destruída pela queda, deixando o homem sem valor moral.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 603,
        categoria: 'certa',
        enunciado: 'Qual conexão existe entre a criação e o Sábado segundo o adventismo?',
        opcoes: [
          'a) O Sábado foi instituído no Sinai apenas para os judeus, sem conexão com a semana da criação.',
          'b) O Sábado é o memorial semanal da criação, instituído por Deus no sétimo dia para toda a humanidade.',
          'c) O Sábado substituiu o domingo que os anjos já observavam antes da criação do mundo.',
          'd) O descanso de Deus no sétimo dia foi apenas metáfora de Sua satisfação, sem implicações práticas.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 604,
        categoria: 'incorreta',
        enunciado: 'Sobre a doutrina adventista da criação, marque a afirmação INCORRETA:',
        opcoes: [
          'a) A criação ex nihilo significa que Deus criou o universo do nada, sem matéria preexistente.',
          'b) O relato de Gênesis apresenta uma semana literal de seis dias de criação e um dia de descanso.',
          'c) O adventismo aceita a teoria evolutiva como mecanismo utilizado por Deus para criar as espécies.',
          'd) A criação revela que somos seres dependentes e responsáveis perante o nosso Criador.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 605,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmativa INCORRETA sobre a natureza da criação divina:',
        opcoes: [
          'a) Deus criou o universo como ato soberano de Sua vontade livre e amorosa.',
          'b) A criação revela a gloria, o poder e o cuidado de Deus pelo que Ele fez.',
          'c) Os seres humanos foram criados moralmente neutros, sem qualquer semelhança com o caráter de Deus.',
          'd) O mundo criado por Deus era originalmente "muito bom", sem pecado nem sofrimento.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 606,
        categoria: 'vf',
        enunciado: 'Segundo a doutrina adventista, os "dias" de Gênesis 1 representam eras geológicas de milhões de anos, não dias literais de 24 horas.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo interpreta os dias da criação como dias literais de 24 horas, baseado na estrutura do texto hebraico e na conexão com o mandamento do Sábado, que faz referência explícita à semana da criação.',
      },
      {
        id: 607,
        categoria: 'apologetica',
        enunciado: 'Um professor de biologia diz: "A ciência provou que a vida evoluiu ao longo de bilhões de anos — como você pode acreditar em criação literal?" Como você responde?',
        opcoes: [
          'a) Abandona a doutrina da criação literal e aceita integralmente a teoria da evolução.',
          'b) Distingue entre ciência observacional e interpretações filosóficas dos dados; explica que a Bíblia é a revelação de Deus que nos oferece o contexto correto para interpretar as evidências.',
          'c) Afirma que toda ciência que contradiz a Bíblia é automaticamente falsa e deve ser rejeitada.',
          'd) Diz que a fé e a ciência são domínios completamente separados que nunca se relacionam.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 7,
    nome: 'A Natureza do Homem',
    texto: `O ser humano é uma unidade psicossomática: corpo e sopro de vida combinados resultam em alma vivente. A Bíblia não ensina que o homem tem uma alma imortal separada do corpo, mas que ele É uma alma — um ser indivisível. Essa compreensão é fundamental para a doutrina adventista sobre a morte e a ressurreição.

Criados à imagem de Deus, os seres humanos possuem dignidade, valor e capacidade para o relacionamento com Deus e com outros. Mas essa imagem foi distorcida pelo pecado. Por meio de Cristo, porém, essa imagem pode ser progressivamente restaurada pela ação do Espírito Santo.

A mortalidade é a condição atual da humanidade. A imortalidade não é inerente ao ser humano — ela é um dom de Deus concedido na ressurreição. Por isso, a morte é descrita nas Escrituras como um sono: os mortos não têm consciência ou atividade até serem despertados na ressurreição.`,
    perguntas: [
      {
        id: 701,
        categoria: 'certa',
        enunciado: 'O que a Bíblia ensina sobre a natureza do ser humano em Gênesis 2:7?',
        opcoes: [
          'a) Que o ser humano é composto de um corpo mortal e uma alma imortal que sobrevive à morte.',
          'b) Que Deus formou o homem do pó da terra e soprou nele o fôlego de vida, tornando-o uma alma vivente.',
          'c) Que a alma humana preexistia no céu antes de habitar um corpo físico.',
          'd) Que o espírito humano é uma centelha da essência divina que retorna a Deus após a morte.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 702,
        categoria: 'certa',
        enunciado: 'Como o adventismo entende a condição dos mortos com base em Eclesiastes 9:5?',
        opcoes: [
          'a) Os mortos estão conscientes em um estado intermediário, aguardando o julgamento final.',
          'b) Os mortos não sabem nada — a morte é um estado de inconsciência total, como um sono profundo.',
          'c) Os mortos justos vão imediatamente para o céu e os ímpios para o inferno ao morrer.',
          'd) Os mortos podem se comunicar com os vivos por meio de médiuns e visões.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 703,
        categoria: 'certa',
        enunciado: 'Por que o adventismo rejeita a doutrina da imortalidade natural da alma?',
        opcoes: [
          'a) Porque a alma humana é mortal por natureza e a imortalidade só será concedida na ressurreição.',
          'b) Porque a Bíblia ensina que apenas os anjos possuem vida espiritual, não os seres humanos.',
          'c) Porque o conceito de alma imortal foi inventado pela Igreja Católica na Idade Média.',
          'd) Porque os mortos sofrem conscientemente no purgatório, não na imortalidade imediata.',
        ],
        resposta_correta: 'a',
      },
      {
        id: 704,
        categoria: 'incorreta',
        enunciado: 'Sobre a natureza humana segundo o adventismo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) O ser humano é uma unidade integral de corpo, mente e espírito — não um corpo com uma alma separável.',
          'b) A morte é um estado de inconsciência comparado nas Escrituras a um sono.',
          'c) A alma humana é imortal por natureza e sobrevive separadamente ao corpo após a morte.',
          'd) A imortalidade é um dom de Deus concedido aos redimidos na ressurreição.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 705,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre o entendimento adventista da morte:',
        opcoes: [
          'a) Os mortos não têm conhecimento, amor, ódio ou participação em qualquer coisa sob o sol (Ec 9:5-6).',
          'b) A ressurreição é necessária para que os mortos tenham vida novamente.',
          'c) Os mortos justos estão atualmente no céu, conscientes e adorando a Deus.',
          'd) Jesus descreveu a morte de Lázaro como um sono, mostrando o estado inconsciente dos mortos.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 706,
        categoria: 'vf',
        enunciado: 'Segundo o adventismo, a alma humana é uma entidade separada do corpo que continua consciente após a morte, permanecendo ativa até a ressurreição.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo ensina o sono dos mortos: a morte é um estado de total inconsciência. O ser humano é uma unidade e não possui alma separada que sobrevive ao corpo. A vida consciente só retorna na ressurreição.',
      },
      {
        id: 707,
        categoria: 'apologetica',
        enunciado: 'Um familiar diz: "Minha avó morreu e agora está no céu me olhando." Como você responde com base na doutrina adventista?',
        opcoes: [
          'a) Concorda, dizendo que isso é o que a Bíblia claramente ensina.',
          'b) Com gentileza explica que a Bíblia descreve a morte como sono — os mortos estão aguardando a ressurreição inconscientes, e a avó descansará em paz até que Jesus venha buscá-la.',
          'c) Diz que ela está sofrendo no purgatório, não no céu.',
          'd) Afirma que a avó pode estar reencarnada em outro ser.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 8,
    nome: 'O Grande Conflito',
    texto: `Toda a humanidade está agora envolvida num grande conflito entre Cristo e Satanás, sobre o caráter de Deus, Sua lei e Sua soberania sobre o universo. Este conflito teve origem no céu quando Lúcifer, ser criado perfeito e exaltado, escolheu rebelar-se contra Deus por causa do orgulho e da ambição.

Depois de ser expulso do céu, Satanás continuou seu conflito na Terra, levando Adão e Eva a pecarem e separando-os de Deus. Desde então, o diabo tem tentado desvirtuar o caráter de Deus aos olhos dos seres humanos e dos anjos, apresentando Deus como injusto e tirano.

Deus permitiu que o conflito continuasse para que o universo pudesse ver claramente as consequências do pecado e da separação de Deus. Em Cristo, Satanás foi derrotado definitivamente na cruz. No fim dos tempos, o conflito chegará ao seu encerramento com a destruição total do pecado e de Satanás, e Deus será vindicado diante do universo.`,
    perguntas: [
      {
        id: 801,
        categoria: 'certa',
        enunciado: 'Onde teve origem o Grande Conflito, segundo o adventismo?',
        opcoes: [
          'a) Na Terra, quando Adão e Eva pecaram no jardim do Éden.',
          'b) No céu, quando Lúcifer se rebelou contra Deus por causa do orgulho e da ambição.',
          'c) No momento em que Deus criou os seres humanos com livre-arbítrio.',
          'd) Em Babilônia, quando os seres humanos construíram a Torre de Babel.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 802,
        categoria: 'certa',
        enunciado: 'Qual é o objetivo principal do Grande Conflito, segundo a perspectiva adventista?',
        opcoes: [
          'a) Determinar quem é mais poderoso: Deus ou Satanás.',
          'b) Vindicar o caráter de Deus e demonstrar a justiça de Sua lei diante do universo.',
          'c) Testar os seres humanos para ver quem merece ser salvo.',
          'd) Provar que o ser humano tem força suficiente para vencer o pecado por conta própria.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 803,
        categoria: 'certa',
        enunciado: 'Como a cruz de Cristo se relaciona com o Grande Conflito?',
        opcoes: [
          'a) A cruz foi uma derrota de Cristo que Satanás temporariamente venceu.',
          'b) Na cruz, Satanás foi derrotado definitivamente, pois Cristo demonstrou o amor sacrificial de Deus e satisfez as exigências da lei.',
          'c) A cruz apenas adormeceu o conflito, que continuará com a mesma intensidade até o fim.',
          'd) A cruz foi necessária apenas para satisfazer a ira de Deus, sem relação com o conflito com Satanás.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 804,
        categoria: 'incorreta',
        enunciado: 'Sobre o Grande Conflito, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) O conflito envolve o caráter de Deus, Sua lei e Sua soberania sobre o universo.',
          'b) Satanás é um ser criado que se rebelou voluntariamente contra Deus.',
          'c) Deus é o autor e causador do sofrimento humano, usando o pecado como instrumento educativo.',
          'd) O conflito terminará com a destruição completa de Satanás e do pecado.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 805,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre Satanás e o Grande Conflito:',
        opcoes: [
          'a) Satanás era originalmente um ser angelical perfeito chamado Lúcifer.',
          'b) A rebelião de Satanás no céu originou-se do orgulho e do desejo de ser como Deus.',
          'c) Satanás e Deus são forças igualmente poderosas num duelo eterno sem vencedor.',
          'd) Satanás tentou Adão e Eva, levando à queda e à entrada do pecado na humanidade.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 806,
        categoria: 'vf',
        enunciado: 'O Grande Conflito mostra que Deus é injusto ao permitir o sofrimento, confirmando o argumento de Satanás contra o caráter divino.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O desenvolvimento do Grande Conflito revela exatamente o oposto: Deus é justo, amoroso e soberano. Ao longo da história, as consequências do pecado e as obras redentoras de Cristo demonstram que os argumentos de Satanás contra Deus são falsos.',
      },
      {
        id: 807,
        categoria: 'apologetica',
        enunciado: 'Alguém pergunta: "Se Deus é bom e todo-poderoso, por que não simplesmente destruiu Satanás quando este se rebelou?" Como você responde?',
        opcoes: [
          'a) Diz que Deus não tinha poder para destruir Satanás imediatamente.',
          'b) Explica que destruir Satanás imediatamente teria levantado dúvidas sobre o caráter de Deus — o conflito precisou se desenvolver para que o universo pudesse ver claramente as consequências do pecado.',
          'c) Afirma que Deus e Satanás são aliados secretos num acordo para testar a humanidade.',
          'd) Diz que Satanás é apenas uma metáfora do mal humano, não um ser real.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 9,
    nome: 'A Vida, Morte e Ressurreição de Cristo',
    texto: `Em Cristo, Deus Se encarnou para redimir a humanidade caída. Sua vida perfeitamente obediente ao Pai cumpriu os requisitos da lei divina em nosso lugar. Sua morte na cruz foi substitutiva e expiatória: Ele tomou sobre Si a condenação que merecíamos, reconciliando o mundo com Deus.

A ressurreição de Cristo é o evento central da fé cristã. Sem a ressurreição, como declara Paulo, nossa fé seria vã. A ressurreição corporal de Jesus garantiu a derrota definitiva da morte e da sepultura, sendo a primeira garantia e sinal das nossas próprias ressurreições futuras.

Cristo ressurreto ascendeu ao céu, onde ministra como nosso Sumo Sacerdote e Intercessor. Toda a vida cristã é vivida à luz da encarnação, cruz e ressurreição: esses três eventos revelam o comprometimento eterno de Deus com a redenção da humanidade e formam o fundamento da salvação.`,
    perguntas: [
      {
        id: 901,
        categoria: 'certa',
        enunciado: 'Por que a ressurreição corporal de Cristo é fundamental para a fé cristã?',
        opcoes: [
          'a) Porque prova que Jesus era um mágico poderoso que podia vencer as leis naturais.',
          'b) Porque sem a ressurreição a morte de Cristo seria um fracasso e a nossa fé seria vã — ela garante que Cristo venceu a morte e que nós também ressuscitaremos.',
          'c) Porque a ressurreição é apenas um símbolo espiritual da nova vida moral no crente.',
          'd) Porque a ressurreição fisica foi necessária para que Cristo pudesse ter um corpo com que ascender.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 902,
        categoria: 'certa',
        enunciado: 'O que significa dizer que a morte de Cristo foi "substitutiva"?',
        opcoes: [
          'a) Que Cristo morreu no lugar de outro discípulo que estava sendo executado.',
          'b) Que Cristo tomou sobre Si a condenação e a morte que a humanidade mereceu pelo pecado, morrendo em nosso lugar.',
          'c) Que a morte de Cristo foi um exemplo de martírio que inspira outros a morrerem por suas crenças.',
          'd) Que a morte de Cristo foi temporária e portanto não constitui um sacrifício real.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 903,
        categoria: 'certa',
        enunciado: 'Qual é a relação entre a vida perfeita de Cristo e a salvação do crente?',
        opcoes: [
          'a) A vida perfeita de Cristo foi apenas um exemplo moral que devemos seguir pela nossa própria força.',
          'b) A obediência perfeita de Cristo é creditada ao crente pela fé, cumprindo o que a lei exigia de nós.',
          'c) A perfeição de Cristo é irrelevante para a salvação — apenas Sua morte importa.',
          'd) Somente os que atingem o mesmo nível de perfeição de Cristo podem ser salvos.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 904,
        categoria: 'incorreta',
        enunciado: 'Sobre a obra redentora de Cristo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) Jesus viveu uma vida perfeitamente obediente em nosso lugar.',
          'b) A morte de Cristo satisfez as exigências da lei divina quanto ao pecado.',
          'c) Cristo ressuscitou apenas espiritualmente — Seu corpo físico permaneceu no sepulcro.',
          'd) A ascensão de Cristo inaugurou Seu ministério intercessor no santuário celestial.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 905,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a ressurreição de Cristo:',
        opcoes: [
          'a) A ressurreição foi corporal — o mesmo Jesus que morreu ressuscitou em corpo transformado.',
          'b) A ressurreição é a garantia da futura ressurreição dos mortos em Cristo.',
          'c) Paulo afirma que se Cristo não ressuscitou, a nossa fé é vã (1 Co 15:14).',
          'd) A ressurreição de Cristo foi apenas uma aparição espiritual que os discípulos interpretaram como corporal.',
        ],
        resposta_correta: 'd',
      },
      {
        id: 906,
        categoria: 'vf',
        enunciado: 'A morte de Cristo foi um fracasso do plano de redenção que foi corrigido pela ressurreição, pois a salvação depende apenas da ressurreição, não da cruz.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'Tanto a morte quanto a ressurreição são essenciais para a salvação. A morte expiatória de Cristo pagou pelo pecado; a ressurreição confirmou que o sacrifício foi aceito e garantiu a vitória sobre a morte. Ambos os eventos são inseparáveis na obra da redenção.',
      },
      {
        id: 907,
        categoria: 'apologetica',
        enunciado: 'Um agnóstico diz: "A ressurreição é impossível — os mortos não voltam à vida." Como você defende a ressurreição historicamente?',
        opcoes: [
          'a) Diz que a ressurreição é apenas uma metáfora espiritual e não aconteceu literalmente.',
          'b) Aponta evidências históricas: o túmulo vazio, as aparições a mais de 500 testemunhas, a transformação radical dos discípulos — evidências que demandam explicação além de lenda ou alucinação coletiva.',
          'c) Argumenta apenas com base na autoridade da Igreja e da tradição cristã.',
          'd) Diz que é impossível discutir com agnósticos e que apenas a fé importa.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 10,
    nome: 'A Experiência da Salvação',
    texto: `Em infinita graça e misericórdia, Deus tornou Cristo, que não conhecia pecado, pecado por nós, para que nEle nos tornássemos justiça de Deus. Guiados pelo Espírito Santo, sentimos nossa necessidade, reconhecemos nossa pecaminosidade, nos arrependemos dos nossos pecados e exercemos fé em Jesus como Senhor e Cristo.

Esta fé salvadora nos traz justificação — o perdão de nossos pecados passados e a aceitação de nós por parte de Deus. Com a justificação vem também a santificação: o processo contínuo de crescimento na graça e no caráter de Deus. A glorificação, a transformação final do crente, ocorrerá na segunda vinda de Cristo.

A salvação é pela graça mediante a fé — não pelas obras humanas. Mas a fé genuína sempre produz frutos: amor a Deus, obediência à Sua lei e serviço ao próximo. Segurança e assurance são possíveis na experiência do crente, não com base em merecimento, mas com base na fidelidade de Deus às Suas promessas.`,
    perguntas: [
      {
        id: 1001,
        categoria: 'certa',
        enunciado: 'O que significa a justificação pela fé?',
        opcoes: [
          'a) Que Deus nos declara justos com base em nossa obediência acumulada ao longo da vida.',
          'b) Que Deus nos declara justos por causa da justiça de Cristo creditada a nós através da fé, com perdão dos pecados passados.',
          'c) Que a fé em Cristo nos torna automaticamente perfeitos sem necessidade de crescimento espiritual.',
          'd) Que somos justificados pela fé e pelas obras em proporções iguais.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1002,
        categoria: 'certa',
        enunciado: 'Qual é a diferença entre justificação e santificação na experiência da salvação?',
        opcoes: [
          'a) Justificação é para cristãos maduros e santificação é para iniciantes na fé.',
          'b) Justificação é o ato de Deus declarar o pecador justo pela fé; santificação é o processo contínuo de crescimento no caráter de Cristo.',
          'c) Justificação e santificação são termos sinônimos para o mesmo evento de conversão.',
          'd) A justificação depende das obras; a santificação depende apenas da fé.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1003,
        categoria: 'certa',
        enunciado: 'O que o adventismo ensina sobre a relação entre fé e obras na salvação?',
        opcoes: [
          'a) As obras são igualmente necessárias à fé para a salvação.',
          'b) A salvação é pela graça mediante a fé; mas a fé genuína sempre produz frutos de obediência e amor.',
          'c) As obras são desnecessárias — a fé é suficiente sem qualquer mudança de comportamento.',
          'd) A fé é apenas o ponto de partida; as obras acumuladas determinam a salvação final.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1004,
        categoria: 'incorreta',
        enunciado: 'Sobre a experiência da salvação segundo o adventismo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) O arrependimento genuíno é uma condição para receber o perdão divino.',
          'b) A justificação envolve o perdão dos pecados e a aceitação do pecador por parte de Deus.',
          'c) A salvação é conquistada através da acumulação de boas obras ao longo da vida.',
          'd) O Espírito Santo guia o pecador ao arrependimento e à fé em Cristo.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1005,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a segurança da salvação no adventismo:',
        opcoes: [
          'a) O crente pode ter assurance com base na fidelidade de Deus às Suas promessas.',
          'b) A segurança da salvação é possível sem arrogância espiritual, baseada em Cristo e não em mérito próprio.',
          'c) Uma vez salvo, o crente não pode nunca perder a salvação, independentemente de suas escolhas futuras.',
          'd) A segurança plena da salvação inclui o compromisso contínuo de fé e relacionamento com Cristo.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1006,
        categoria: 'vf',
        enunciado: 'No adventismo, a salvação é conquistada pela combinação de graça divina e acúmulo de mérito humano ao longo da vida cristã.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'A salvação adventista é inteiramente pela graça mediante a fé em Cristo. Nenhum mérito humano contribui para a salvação. As boas obras são o fruto da salvação, não a sua causa ou condição.',
      },
      {
        id: 1007,
        categoria: 'apologetica',
        enunciado: 'Um amigo diz: "Os adventistas se acham melhores por guardar o sábado e não comer carne de porco — isso é salvação pelas obras." Como você esclarece?',
        opcoes: [
          'a) Concorda que o adventismo prega salvação pelas obras e que isso é um problema a corrigir.',
          'b) Explica que o adventismo ensina salvação pela graça mediante a fé, e que a obediência é a resposta de amor à salvação já recebida — não o meio de obtê-la.',
          'c) Diz que o amigo tem razão e que a guarda do sábado é apenas cultural, sem importância teológica.',
          'd) Afirma que quem não guarda o sábado não pode ser salvo de forma alguma.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 11,
    nome: 'Crescer em Cristo',
    texto: `Por Sua morte na cruz, Jesus triunfou sobre as forças do mal. Aquele que andou com Ele durante Seu ministério terrestre foi transformado pelo poder do Espírito Santo. Através de orações diárias, estudo da Palavra, meditação e comunhão com Cristo, o crente cresce espiritualmente.

O crescimento espiritual é um processo — não um evento único. Envolve cooperação humana com o Espírito Santo através de disciplinas espirituais: oração, jejum, estudo bíblico e serviço. Esse processo é chamado de santificação progressiva, e seu objetivo é a plena restauração da imagem de Deus no crente.

As tentações e os fracassos fazem parte da jornada cristã. O crente que cai pode voltar a Cristo em arrependimento e encontrar perdão e força renovada. A vitória sobre o pecado não é por esforço humano isolado, mas pelo poder de Cristo que habita no crente por meio do Espírito Santo.`,
    perguntas: [
      {
        id: 1101,
        categoria: 'certa',
        enunciado: 'O que é a santificação progressiva no contexto do crescimento cristão?',
        opcoes: [
          'a) Um evento único que ocorre no momento do batismo, tornando o crente imediatamente perfeito.',
          'b) O processo contínuo pelo qual o Espírito Santo transforma o caráter do crente à semelhança de Cristo ao longo da vida.',
          'c) A acumulação de boas obras suficientes para garantir a salvação final.',
          'd) Um estado de perfeição moral absoluta que o crente atinge antes da segunda vinda.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1102,
        categoria: 'certa',
        enunciado: 'Quais disciplinas espirituais são essenciais para o crescimento em Cristo?',
        opcoes: [
          'a) Apenas a frequência regular ao culto nos sábados — as demais práticas são opcionais.',
          'b) Oração, estudo da Palavra, meditação, serviço e comunhão com outros crentes — práticas que mantêm a conexão vital com Cristo.',
          'c) Apenas o jejum e a abstinência de alimentos durante períodos sagrados.',
          'd) O estudo intensivo das doutrinas adventistas, sem necessidade de oração ou serviço.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1103,
        categoria: 'certa',
        enunciado: 'Como o adventismo entende a relação entre esforço humano e poder divino no crescimento espiritual?',
        opcoes: [
          'a) O crescimento espiritual é inteiramente responsabilidade humana — Deus aguarda nosso esforço.',
          'b) O crescimento requer cooperação: o crente exercita as disciplinas espirituais e o Espírito Santo opera a transformação interior.',
          'c) Deus transforma o crente independentemente de qualquer esforço ou cooperação humana.',
          'd) O crescimento espiritual é um mito — somos perfeitos ou somos pecadores, sem estágio intermediário.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1104,
        categoria: 'incorreta',
        enunciado: 'Sobre o crescimento em Cristo, marque a afirmação INCORRETA:',
        opcoes: [
          'a) O crente que cai pode voltar a Cristo em arrependimento e encontrar perdão.',
          'b) A vitória sobre o pecado é possível pelo poder de Cristo que habita no crente.',
          'c) O crescimento espiritual é opcional — o cristão pode ser salvo sem qualquer mudança de caráter.',
          'd) A oração e o estudo da Bíblia são meios pelos quais o crente mantém sua conexão com Cristo.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1105,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a vida cristã segundo o adventismo:',
        opcoes: [
          'a) O Espírito Santo é o agente principal da transformação do caráter cristão.',
          'b) As tentações e fracassos fazem parte da jornada cristã normal.',
          'c) Alcançar a perfeição moral absoluta nesta vida é requisito para a salvação segundo o adventismo.',
          'd) Cristo triunfou sobre as forças do mal pela cruz, e Seu poder está disponível ao crente.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1106,
        categoria: 'vf',
        enunciado: 'O adventismo ensina que o cristão que falha moralmente perde definitivamente sua salvação e não pode ser restaurado.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo ensina que o crente que peca e se arrepende encontra perdão e restauração em Cristo. 1 João 1:9 promete que Deus é fiel e justo para perdoar os nossos pecados quando os confessamos.',
      },
      {
        id: 1107,
        categoria: 'apologetica',
        enunciado: 'Um colega cristão diz: "Você nunca vai conseguir vencer o pecado — é impossível." Como você responde com base no adventismo?',
        opcoes: [
          'a) Concorda, dizendo que a vitória sobre o pecado é impossível e que Deus nos perdoa para sempre sem expectativa de mudança.',
          'b) Explica que pela graça e pelo poder do Espírito Santo o crente pode crescer e ter vitória progressiva sobre o pecado, sem arrogância mas com fé nas promessas de Deus.',
          'c) Afirma que você já alcançou a perfeição moral e não peca mais.',
          'd) Diz que tentar vencer o pecado é desnecessário porque Cristo nos cobriu com Sua graça.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 12,
    nome: 'A Igreja',
    texto: `A Igreja é a comunidade de crentes que confessam Jesus Cristo como Senhor e Salvador. Na forma universal, a Igreja consiste em todos que creem em Cristo, independentemente de denominação; na forma local, é uma congregação específica de crentes que se reúnem para adorar, aprender e servir juntos.

A Igreja é o corpo de Cristo — Ele é a cabeça e os membros são chamados a funcionar juntos com seus diferentes dons e ministérios para o crescimento mútuo e a missão no mundo. A Igreja não é apenas uma organização humana, mas uma realidade espiritual plantada e sustentada por Deus.

A missão da Igreja é proclamar o evangelho ao mundo, discipular os crentes, servir aos necessitados e preparar um povo para a segunda vinda de Cristo. A adoração, a comunhão fraternal, o estudo das Escrituras e a oração são práticas centrais da vida comunitária da Igreja.`,
    perguntas: [
      {
        id: 1201,
        categoria: 'certa',
        enunciado: 'O que a doutrina adventista ensina sobre a natureza da Igreja universal?',
        opcoes: [
          'a) A Igreja universal é limitada à denominação adventista e excluí todos os demais cristãos.',
          'b) A Igreja universal consiste em todos os que creem em Cristo como Senhor e Salvador, independentemente de denominação.',
          'c) A Igreja universal não existe — apenas as congregações locais são a verdadeira Igreja.',
          'd) A Igreja universal será estabelecida apenas após a segunda vinda de Cristo.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1202,
        categoria: 'certa',
        enunciado: 'Qual é a missão central da Igreja segundo o adventismo?',
        opcoes: [
          'a) Preservar as tradições religiosas e o patrimônio cultural cristão.',
          'b) Proclamar o evangelho ao mundo, discipular os crentes e preparar um povo para a segunda vinda de Cristo.',
          'c) Defender os interesses políticos dos cristãos na sociedade.',
          'd) Promover a unificação de todas as denominações cristãs numa única organização mundial.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1203,
        categoria: 'certa',
        enunciado: 'Como o adventismo descreve a relação entre Cristo e a Igreja?',
        opcoes: [
          'a) Cristo é apenas o fundador histórico da Igreja, sem envolvimento atual em sua vida.',
          'b) Cristo é a cabeça da Igreja e esta é Seu corpo — a relação é orgânica, vital e inseparável.',
          'c) A Igreja é superior a Cristo em autoridade para interpretar a Bíblia e definir a doutrina.',
          'd) Cristo delegou toda autoridade à liderança humana da Igreja sem manter envolvimento direto.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1204,
        categoria: 'incorreta',
        enunciado: 'Sobre a natureza e missão da Igreja, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) A Igreja local é uma congregação de crentes que se reúnem para adorar, aprender e servir.',
          'b) Os membros da Igreja são chamados a usar seus dons espirituais para o crescimento do corpo.',
          'c) A Igreja adventista é a única expressão legítima do corpo de Cristo na terra.',
          'd) A adoração, a comunhão e o estudo bíblico são práticas centrais da vida eclesial.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1205,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a Igreja segundo o adventismo:',
        opcoes: [
          'a) A Igreja tem missão de servir aos necessitados além de proclamar o evangelho.',
          'b) A comunhão fraternal entre os membros é parte essencial da vida eclesial.',
          'c) A Igreja existe apenas para o benefício espiritual de seus membros, sem obrigação com o mundo externo.',
          'd) O batismo é o rito de iniciação que incorpora o crente à comunidade da Igreja.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1206,
        categoria: 'vf',
        enunciado: 'Segundo o adventismo, a participação ativa numa comunidade de fé local é essencial para o crescimento espiritual — um cristão não pode viver de forma saudável em isolamento eclesial.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Verdadeiro',
        justificativa: 'O adventismo enfatiza a importância da comunidade de fé local para crescimento espiritual, apoio mútuo e missão. A epístola aos Hebreus exorta a não abandonar a reunião dos que creem (Hb 10:25).',
      },
      {
        id: 1207,
        categoria: 'apologetica',
        enunciado: 'Alguém diz: "Eu acredito em Deus mas não preciso da Igreja — me relaciono com Deus sozinho." Como você responde biblicamente?',
        opcoes: [
          'a) Concorda, dizendo que a Igreja é opcional para cristãos maduros.',
          'b) Explica que a vida cristã foi projetada para ser vivida em comunidade — a Igreja é o corpo de Cristo, e pertencer a ela é necessário para crescimento, missão e apoio mútuo.',
          'c) Diz que sem frequentar a Igreja adventista a pessoa não pode ser salva.',
          'd) Argumenta que a Igreja é necessária apenas para os que têm fraqueza espiritual.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 13,
    nome: 'Os Remanescentes e sua Missão',
    texto: `A Igreja universal sofreu uma grande apostasia durante a Idade Média. Mas Deus sempre manteve um remanescente fiel. No tempo do fim, Ele levantará um remanescente que guarda os mandamentos de Deus e tem a fé em Jesus — descrito em Apocalipse 12:17 e 14:12.

A missão deste remanescente é proclamar as Três Mensagens Angélicas de Apocalipse 14 ao mundo: o evangelho eterno, o chamado ao temor de Deus e ao julgamento, e o apelo para sair da Babilônia espiritual. Essa missão é urgente por causa da proximidade da segunda vinda de Cristo.

A Igreja Adventista do Sétimo Dia se entende como a expressão visível deste remanescente, chamado a proclamar essas mensagens finais. Isso não significa arrogância ou exclusivismo, mas senso de responsabilidade e missão. O adventismo é uma movimento profético com uma mensagem especial para a hora presente.`,
    perguntas: [
      {
        id: 1301,
        categoria: 'certa',
        enunciado: 'O que Apocalipse 12:17 ensina sobre o remanescente de Deus no tempo do fim?',
        opcoes: [
          'a) Que o remanescente será um grupo político que governará as nações antes da segunda vinda.',
          'b) Que o remanescente guarda os mandamentos de Deus e tem o testemunho de Jesus Cristo.',
          'c) Que o remanescente é composto apenas pelos 144.000 judeus convertidos.',
          'd) Que o remanescente escapará de toda perseguição e viverá em paz até o fim.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1302,
        categoria: 'certa',
        enunciado: 'O que são as "Três Mensagens Angélicas" de Apocalipse 14?',
        opcoes: [
          'a) Três revelações apocalípticas sobre guerras políticas antes da segunda vinda.',
          'b) Três mensagens proféticas que proclamam o evangelho eterno, o julgamento, e o apelo para sair da Babilônia espiritual.',
          'c) Três mandamentos adicionais revelados pelo anjo Gabriel para os últimos dias.',
          'd) Três sinais do fim que ocorrerão simultaneamente antes da segunda vinda de Cristo.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1303,
        categoria: 'certa',
        enunciado: 'Como o adventismo entende seu papel como movimento remanescente?',
        opcoes: [
          'a) Como o único grupo cristão salvo, excluindo todos os demais crentes de outras denominações.',
          'b) Como um movimento profético com missão especial de proclamar as mensagens do tempo do fim, sem arrogância exclusivista.',
          'c) Como um grupo étnico e cultural que preserva as tradições judaicas no contexto cristão.',
          'd) Como uma organização política para estabelecer um governo teocrático antes da segunda vinda.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1304,
        categoria: 'incorreta',
        enunciado: 'Sobre o remanescente e sua missão, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) O remanescente de Deus é descrito em Apocalipse como guardador dos mandamentos e fiel a Jesus.',
          'b) A missão do remanescente inclui proclamar o evangelho ao mundo inteiro antes da segunda vinda.',
          'c) O remanescente é identificado como a nação política de Israel que será restaurada no tempo do fim.',
          'd) As Três Mensagens Angélicas têm aplicação universal — são para toda a humanidade.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1305,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a missão adventista:',
        opcoes: [
          'a) A missão adventista tem sentido de urgência por causa da iminência da segunda vinda.',
          'b) A proclamação do adventismo inclui o evangelho eterno como fundamento central.',
          'c) A missão do adventismo é estabelecer um governo mundial cristão antes da segunda vinda.',
          'd) O adventismo convida todas as pessoas a temerem a Deus e darem glória a Ele.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1306,
        categoria: 'vf',
        enunciado: 'O adventismo afirma que somente os membros da Igreja Adventista do Sétimo Dia serão salvos, pois são o único remanescente verdadeiro de Deus.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo não afirma exclusividade da salvação. Deus tem filhos em todas as denominações. A identidade de remanescente se refere à missão profética especial, não à exclusividade da salvação.',
      },
      {
        id: 1307,
        categoria: 'apologetica',
        enunciado: 'Um cristão de outra denominação diz: "Adventistas são arrogantes por se acharem o único povo de Deus." Como você responde?',
        opcoes: [
          'a) Concorda que a doutrina do remanescente é arrogante e deve ser abandonada.',
          'b) Explica que o adventismo reconhece filhos de Deus em todas as denominações; a identidade remanescente é sobre missão profética especial no tempo do fim, não sobre exclusividade da salvação.',
          'c) Diz que de fato apenas os adventistas que guardam o sábado serão salvos.',
          'd) Afirma que a questão é muito complexa e que é melhor não discutir doutrinas.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 14,
    nome: 'Unidade no Corpo de Cristo',
    texto: `Em Cristo somos uma nova criação; as distinções de raça, cultura, educação e nacionalidade não devem ser causas de divisão entre nós. Somos iguais em Cristo, que por um Espírito nos batizou em um só corpo.

A Igreja é chamada à unidade — não uniformidade, mas unidade na diversidade. Diferentes dons, diferentes culturas e diferentes temperamentos enriquecem o corpo de Cristo quando todos estão submetidos ao senhorio de Cristo e guiados pela mesma Palavra. A unidade verdadeira não é meramente organizacional, mas espiritual.

A divisão e o sectarismo enfraquecem a missão da Igreja e contradizem a oração de Cristo em João 17: "que todos sejam um". O adventismo é uma Igreja mundial que abrange pessoas de mais de 200 países, refletindo a unidade na diversidade que caracterizará o povo redimido para sempre.`,
    perguntas: [
      {
        id: 1401,
        categoria: 'certa',
        enunciado: 'O que significa unidade no corpo de Cristo segundo o adventismo?',
        opcoes: [
          'a) Que todos os cristãos devem pertencer à mesma denominação e ter as mesmas práticas culturais.',
          'b) Que apesar das diferenças culturais, raciais e de dons, todos os crentes são iguais em Cristo e unidos pelo mesmo Espírito.',
          'c) Que a unidade requer a supressão de todas as diferenças individuais e culturais.',
          'd) Que a unidade cristã será alcançada apenas no céu, sendo impossível nesta vida.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1402,
        categoria: 'certa',
        enunciado: 'O que Jesus orou em João 17 em relação à Sua Igreja?',
        opcoes: [
          'a) Que Seus discípulos fossem retirados do mundo para viver em comunidades separadas.',
          'b) Que todos fossem um, assim como Ele e o Pai são um — unidade como testemunho para o mundo.',
          'c) Que Seus discípulos conquistassem o mundo politicamente.',
          'd) Que a Igreja fosse organizada numa hierarquia estrita de autoridade.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1403,
        categoria: 'certa',
        enunciado: 'Como o adventismo entende a diversidade cultural dentro da unidade eclesial?',
        opcoes: [
          'a) A diversidade cultural é um problema que a Igreja deve superar impondo uma única cultura dominante.',
          'b) A diversidade de culturas, línguas e temperamentos enriquece o corpo de Cristo quando todos estão unidos sob o senhorio de Cristo.',
          'c) Cada cultura cristã deve formar sua própria denominação separada para preservar sua identidade.',
          'd) A unidade cultural é condição prévia para a unidade espiritual na Igreja.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1404,
        categoria: 'incorreta',
        enunciado: 'Sobre a unidade no corpo de Cristo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) Em Cristo, as distinções de raça, cultura e nacionalidade perdem sua função divisória.',
          'b) A unidade verdadeira é espiritual e baseada no senhorio de Cristo, não apenas organizacional.',
          'c) A divisão e o sectarismo são aceitáveis quando baseados em convicções doutrinais firmes.',
          'd) O Espírito Santo é o agente que une os crentes num só corpo apesar de suas diferenças.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1405,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a unidade eclesial:',
        opcoes: [
          'a) A unidade cristã não requer uniformidade cultural ou litúrgica.',
          'b) A oração de Cristo pela unidade da Igreja é um imperativo para a vida eclesial.',
          'c) Divisões baseadas em preconceito racial ou cultural são aceitáveis dentro da Igreja cristã.',
          'd) A Igreja adventista mundial reflete a unidade na diversidade com membros de mais de 200 países.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1406,
        categoria: 'vf',
        enunciado: 'A unidade no corpo de Cristo significa que todos os cristãos devem ter as mesmas opiniões políticas, práticas culturais e estilos de adoração.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'A unidade cristã é espiritual — baseada na fé comum em Cristo, na mesma Escritura e no mesmo Espírito. Ela admite grande diversidade cultural e de expressão sem comprometer a essência do evangelho.',
      },
      {
        id: 1407,
        categoria: 'apologetica',
        enunciado: 'Alguém observa que há muitas denominações cristãs divididas e pergunta: "Se cristãos não conseguem se unir, como podem ter a verdade?" Como você responde?',
        opcoes: [
          'a) Concorda que a divisão prova que o cristianismo é uma religião humana sem verdade objetiva.',
          'b) Reconhece que as divisões são lamentáveis e contrárias ao propósito de Cristo, mas explica que isso é consequência da falha humana, não evidência de que a verdade não existe.',
          'c) Afirma que todas as divisões são irrelevantes porque todos os cristãos chegarão ao mesmo destino.',
          'd) Diz que apenas uma denominação específica tem a verdade completa e as demais são falsas.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 15,
    nome: 'O Batismo',
    texto: `O batismo é um ato sagrado de consagração pública a Deus que simboliza nossa participação na morte e ressurreição de Cristo. Mediante a imersão em água, o batizando expressa sua fé em Cristo, arrependimento dos pecados e compromisso de viver uma vida nova no Senhor.

O adventismo pratica o batismo exclusivamente por imersão, pois esta forma captura melhor o simbolismo bíblico: descer às águas representa a morte ao pecado e ao velho eu; emergir das águas representa ressurreição a uma nova vida em Cristo. O batismo de João era de arrependimento; o batismo cristão é no nome do Pai, do Filho e do Espírito Santo.

O batismo não produz automaticamente a salvação — é um ato de fé e não uma obra meritória. Ele é o rito de iniciação que incorpora o crente à comunidade da Igreja e deve ser precedido por instrução bíblica adequada e tomada consciente de decisão pessoal de fé.`,
    perguntas: [
      {
        id: 1501,
        categoria: 'certa',
        enunciado: 'Qual é o simbolismo do batismo por imersão segundo o adventismo?',
        opcoes: [
          'a) A imersão simboliza a purificação física do corpo como ato de higiene espiritual.',
          'b) Descer às águas representa a morte ao pecado; emergir representa a ressurreição a uma nova vida em Cristo.',
          'c) A quantidade de água usada no batismo determina a profundidade da experiência espiritual.',
          'd) O batismo por imersão simboliza o dilúvio e a arca de Noé como tipos de salvação.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1502,
        categoria: 'certa',
        enunciado: 'Quais são as condições bíblicas para o batismo segundo o ensinamento adventista?',
        opcoes: [
          'a) O batismo deve ser realizado na infância para garantir a proteção divina desde o nascimento.',
          'b) O batismo deve ser precedido por fé em Cristo, arrependimento dos pecados e instrução bíblica adequada.',
          'c) O batismo é válido apenas se realizado por um ministro ordenado adventista.',
          'd) As condições para o batismo são apenas formais e não envolvem necessariamente conversão pessoal.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1503,
        categoria: 'certa',
        enunciado: 'Qual é o papel do batismo na vida do crente e na Igreja?',
        opcoes: [
          'a) O batismo garante automaticamente a salvação independentemente da vida subsequente.',
          'b) O batismo é o rito de iniciação que incorpora o crente à comunidade da Igreja e é símbolo público de fé.',
          'c) O batismo deve ser repetido anualmente como renovação do compromisso cristão.',
          'd) O batismo substitui a necessidade de conversão pessoal para os filhos de crentes.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1504,
        categoria: 'incorreta',
        enunciado: 'Sobre o batismo segundo o adventismo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) O batismo por imersão captura melhor o simbolismo bíblico de morte e ressurreição com Cristo.',
          'b) O batismo deve ser precedido por fé, arrependimento e compreensão das verdades bíblicas.',
          'c) O batismo confere automaticamente a salvação, independentemente da fé pessoal do batizando.',
          'd) Através do batismo, o crente é incorporado à comunidade de fé da Igreja.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1505,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a prática do batismo:',
        opcoes: [
          'a) O batismo é realizado no nome do Pai, do Filho e do Espírito Santo.',
          'b) O batismo deve ser uma decisão consciente e voluntária do indivíduo.',
          'c) O batismo de bebês é a prática recomendada pelo adventismo, baseada na aliança com Abraão.',
          'd) O batismo por imersão é a forma praticada pelo adventismo com base no exemplo bíblico.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1506,
        categoria: 'vf',
        enunciado: 'O adventismo pratica o batismo de bebês como sinal da aliança e garantia de salvação infantil.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo rejeita o batismo infantil. O batismo requer fé consciente, arrependimento e tomada de decisão pessoal — capacidades que os bebês não possuem. Em vez do batismo infantil, muitas igrejas adventistas realizam a dedicação de bebês.',
      },
      {
        id: 1507,
        categoria: 'apologetica',
        enunciado: 'Um cristão de outra tradição diz: "Eu fui batizado quando bebê — por que precisaria ser rebatizado?" Como você responde com base no ensinamento adventista?',
        opcoes: [
          'a) Diz que o batismo infantil é completamente inválido e que a pessoa está perdida.',
          'b) Explica com respeito que o batismo bíblico pressupõe fé consciente e arrependimento — e convida a considerar o batismo como expressão pessoal de sua fé atual em Cristo.',
          'c) Diz que a forma não importa, apenas a intenção dos pais no momento do batismo infantil.',
          'd) Afirma que apenas adventistas que se batizaram por imersão serão salvos.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 16,
    nome: 'A Ceia do Senhor',
    texto: `A Ceia do Senhor é uma ordenança em que os crentes participam da morte e ressurreição de Cristo por meio do pão e do vinho. Jesus instituiu esta ordenança na noite em que foi traído, tomando pão e vinho e distribuindo aos discípulos com as palavras "fazei isto em memória de mim".

O adventismo observa a Ceia do Senhor como uma ordenança memorial — não como um sacrifício renovado. O pão simboliza o corpo de Cristo quebrado por nós; o vinho (suco de uva não fermentado) simboliza Seu sangue derramado pela remissão dos pecados. Ao participar, o crente proclama a morte do Senhor "até que Ele venha".

Antes da Ceia, o adventismo pratica a ordenança da humildade: a lavagem dos pés, conforme o exemplo de Jesus em João 13. Esta prática expressa o espírito de serviço mútuo, humildade e renovação do compromisso com Cristo e com os irmãos antes de participar da mesa do Senhor.`,
    perguntas: [
      {
        id: 1601,
        categoria: 'certa',
        enunciado: 'O que a Ceia do Senhor representa para o adventismo?',
        opcoes: [
          'a) Um sacrifício renovado de Cristo, transformando o pão e o vinho em Seu corpo e sangue literais.',
          'b) Uma ordenança memorial que proclama a morte de Cristo e antecipa Sua segunda vinda.',
          'c) Um ritual mágico que garante automaticamente o perdão dos pecados participados.',
          'd) Uma refeição social cristã sem significado teológico específico.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1602,
        categoria: 'certa',
        enunciado: 'Por que o adventismo pratica a lavagem dos pés antes da Ceia do Senhor?',
        opcoes: [
          'a) Por tradição medieval da Igreja Católica que o adventismo herdou.',
          'b) Seguindo o exemplo de Jesus em João 13, como expressão de humildade, serviço mútuo e renovação do compromisso.',
          'c) Como rito de purificação física necessário para participar da Ceia em estado limpo.',
          'd) A lavagem dos pés é uma prática opcional sem significado espiritual definido.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1603,
        categoria: 'certa',
        enunciado: 'O que o pão e o vinho da Ceia do Senhor simbolizam?',
        opcoes: [
          'a) O pão simboliza a lei de Deus e o vinho simboliza a graça derramada pelo Espírito.',
          'b) O pão simboliza o corpo de Cristo quebrado por nós e o vinho Seu sangue derramado pela remissão dos pecados.',
          'c) O pão e o vinho se transformam literalmente no corpo e sangue de Cristo durante a celebração.',
          'd) Os elementos são apenas representações culturais sem referência ao sacrifício de Cristo.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1604,
        categoria: 'incorreta',
        enunciado: 'Sobre a Ceia do Senhor, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) A Ceia é uma memória da morte de Cristo e uma antecipação de Sua segunda vinda.',
          'b) A lavagem dos pés antes da Ceia expressa humildade e serviço mútuo entre os crentes.',
          'c) O adventismo usa vinho fermentado na Ceia porque esse era o elemento original usado por Jesus.',
          'd) A participação na Ceia deve ser precedida de autoexame e reconciliação com os irmãos.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1605,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a natureza da Ceia do Senhor:',
        opcoes: [
          'a) A Ceia é uma ordenança memorial instituída por Jesus na última ceia com Seus discípulos.',
          'b) Participar da Ceia proclama a morte do Senhor até que Ele venha (1 Co 11:26).',
          'c) Os elementos da Ceia se tornam literalmente o corpo e sangue de Cristo pela consagração do ministro.',
          'd) A Ceia é uma ocasião de renovação espiritual e comunhão com Cristo e os irmãos.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1606,
        categoria: 'vf',
        enunciado: 'O adventismo ensina a transubstanciação: que o pão e o vinho se tornam literalmente o corpo e o sangue de Cristo na Ceia do Senhor.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo rejeita a transubstanciação. A Ceia é entendida como ordenança memorial — o pão e o vinho são símbolos que representam o corpo e o sangue de Cristo, não se transformam literalmente neles.',
      },
      {
        id: 1607,
        categoria: 'apologetica',
        enunciado: 'Um católico pergunta: "Vocês adventistas não acreditam que Cristo está realmente presente na Ceia?" Como você explica a posição adventista com respeito?',
        opcoes: [
          'a) Diz que a posição católica está completamente errada e que não há presença divina na Ceia.',
          'b) Explica que o adventismo crê na presença espiritual de Cristo na Ceia — Ele está presente quando dois ou três se reúnem em Seu nome — mas que os elementos são símbolos, não Seu corpo e sangue literais.',
          'c) Concorda inteiramente com a visão católica da transubstanciação.',
          'd) Diz que a questão da presença de Cristo na Ceia é irrelevante para a salvação.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 17,
    nome: 'Os Dons e Ministérios Espirituais',
    texto: `Deus concede ao conjunto da Igreja, e a cada membro individualmente, dons espirituais que o Espírito Santo distribui conforme Sua soberana vontade. Esses dons foram dados para a edificação mútua dos membros e para a missão da Igreja no mundo — não para benefício pessoal ou ostentação espiritual.

Os dons espirituais incluem a fé, a cura, a profecia, a proclamação, o ensino, a administração, a reconciliação, a compaixão, o serviço e outros. Cada membro tem pelo menos um dom e a responsabilidade de desenvolvê-lo e usá-lo em serviço ao corpo de Cristo.

A variedade de dons e ministérios reflete a sabedoria de Deus que dotou cada membro diferentemente para que o corpo funcione de forma complementar. Nenhum dom é superior a outro — todos são necessários. O amor é o contexto em que todos os dons devem ser exercidos, como Paulo ensina em 1 Coríntios 13.`,
    perguntas: [
      {
        id: 1701,
        categoria: 'certa',
        enunciado: 'Para que finalidade o Espírito Santo distribui dons espirituais aos membros da Igreja?',
        opcoes: [
          'a) Para que os membros dotados possam demonstrar sua superioridade espiritual sobre os demais.',
          'b) Para a edificação mútua dos membros e para o cumprimento da missão da Igreja no mundo.',
          'c) Para que alguns membros possam dispensar os outros dons e servir de forma autossuficiente.',
          'd) Os dons são dados exclusivamente para líderes e ministros ordenados da Igreja.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1702,
        categoria: 'certa',
        enunciado: 'Como o adventismo entende a relação entre a variedade de dons e a unidade do corpo?',
        opcoes: [
          'a) Os dons criam desigualdade — os mais dotados têm mais valor para a Igreja.',
          'b) A variedade de dons reflete a sabedoria de Deus: diferentes membros com diferentes dons se complementam no corpo de Cristo.',
          'c) Todos os membros devem buscar os mesmos dons para garantir a uniformidade eclesial.',
          'd) Os dons espirituais cessaram com os apóstolos e não se aplicam à Igreja atual.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1703,
        categoria: 'certa',
        enunciado: 'O que Paulo ensina em 1 Coríntios 13 sobre o contexto para o exercício dos dons?',
        opcoes: [
          'a) Que os dons devem ser exibidos publicamente para atrair novos membros à Igreja.',
          'b) Que o amor é o contexto necessário para o exercício de todos os dons — sem amor, os dons são inúteis.',
          'c) Que os dons de línguas e profecia são superiores a todos os demais por serem mais visíveis.',
          'd) Que apenas os dons intelectuais como ensino e conhecimento têm valor eterno.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1704,
        categoria: 'incorreta',
        enunciado: 'Sobre os dons espirituais, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) Cada membro da Igreja recebe pelo menos um dom do Espírito.',
          'b) Os dons são dados para o benefício do corpo de Cristo, não para ostentação pessoal.',
          'c) O dom de línguas é o sinal obrigatório do batismo no Espírito Santo para todos os crentes.',
          'd) A responsabilidade de cada membro é desenvolver e usar seus dons em serviço.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1705,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre os ministérios espirituais:',
        opcoes: [
          'a) Os dons espirituais incluem fé, cura, profecia, ensino, administração, serviço e outros.',
          'b) Nenhum dom é superior a outro — todos são necessários para o funcionamento do corpo.',
          'c) Os dons espirituais foram completamente encerrados com a morte dos últimos apóstolos.',
          'd) O Espírito distribui os dons conforme Sua soberana vontade, não conforme nossa preferência.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1706,
        categoria: 'vf',
        enunciado: 'O adventismo ensina que o dom de línguas é o único sinal do batismo no Espírito Santo e que todo crente verdadeiro deve manifestá-lo.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo rejeita a doutrina pentecostal de que falar em línguas é o sinal obrigatório do batismo no Espírito. O Espírito distribui diferentes dons a diferentes membros conforme Sua vontade (1 Co 12:11).',
      },
      {
        id: 1707,
        categoria: 'apologetica',
        enunciado: 'Um cristão pentecostal diz: "Se você não falou em línguas, não foi batizado no Espírito." Como você responde biblicamente?',
        opcoes: [
          'a) Concorda e vai em busca de falar em línguas para provar que tem o Espírito.',
          'b) Aponta 1 Coríntios 12 que ensina que o Espírito distribui diferentes dons a diferentes membros; e Gálatas 5 que o fruto do Espírito — não os dons específicos — é o sinal da vida no Espírito.',
          'c) Diz que o dom de línguas é do diabo e deve ser evitado.',
          'd) Afirma que os dons do Espírito cessaram e que a questão é irrelevante para hoje.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 18,
    nome: 'O Dom da Profecia',
    texto: `Uma das manifestações do dom profético é o ministério de Ellen G. White. Como mensageira do Senhor, seus escritos são uma contínua e autoritativa fonte de verdade que provê à Igreja conforto, orientação, instrução e correção. Eles também deixam claro que a Bíblia é o padrão pelo qual todo ensinamento e experiência deve ser testado.

O dom da profecia não é exclusivo do tempo bíblico — Joel 2:28 promete seu derramamento sobre "toda a carne" no tempo do fim. O adventismo afirma que este dom foi manifesto no ministério de Ellen White como cumprimento daquela profecia, guiando a Igreja em seu desenvolvimento e missão.

É fundamental entender que os escritos de Ellen White não substituem a Bíblia, não se igualam a ela em autoridade, e não devem ser colocados acima das Escrituras. Antes, apontam para a Bíblia, auxiliam em sua interpretação e aplicação, e confirmam as doutrinas bíblicas. A Bíblia sempre tem suprema autoridade.`,
    perguntas: [
      {
        id: 1801,
        categoria: 'certa',
        enunciado: 'Qual é o papel dos escritos de Ellen White na Igreja Adventista?',
        opcoes: [
          'a) Substituir a Bíblia como autoridade suprema para doutrinas e práticas adventistas.',
          'b) Ser uma fonte auxiliar de orientação, conforto e instrução — sempre subordinada à Bíblia como padrão supremo.',
          'c) Ter igual autoridade à Bíblia como revelação divina de mesma hierarquia.',
          'd) Ser aceitos como revelações apenas nas questões de saúde e estilo de vida.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1802,
        categoria: 'certa',
        enunciado: 'Qual texto profético do Antigo Testamento fundamenta a expectativa adventista de que o dom profético operaria no tempo do fim?',
        opcoes: [
          'a) Isaías 40:3 — "A voz do que clama no deserto..."',
          'b) Joel 2:28 — "Depois disto derramarei o meu Espírito sobre toda carne... e vossos filhos e vossas filhas profetizarão."',
          'c) Daniel 12:4 — "muitos correrão de uma parte para outra e a ciência se multiplicará."',
          'd) Amós 3:7 — "Certamente o Senhor Deus não fará coisa alguma sem revelar o Seu segredo aos Seus servos os profetas."',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1803,
        categoria: 'certa',
        enunciado: 'Como devem ser avaliados os escritos de Ellen White segundo o próprio ensinamento adventista?',
        opcoes: [
          'a) Devem ser aceitos sem questionamento como palavras divinas de igual autoridade à Bíblia.',
          'b) Devem ser testados pela Bíblia — qualquer declaração profética deve ser julgada pelas Escrituras.',
          'c) Devem ser interpretados exclusivamente pelo corpo administrativo da Igreja adventista.',
          'd) São relevantes apenas para os adventistas do século XIX e devem ser atualizados.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1804,
        categoria: 'incorreta',
        enunciado: 'Sobre o dom da profecia e Ellen White, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) Os escritos de Ellen White apontam para a Bíblia como padrão supremo de fé e prática.',
          'b) O dom profético não cessou com os apóstolos — pode operar na Igreja até a segunda vinda.',
          'c) Os escritos de Ellen White têm autoridade superior à Bíblia nas questões relacionadas à saúde.',
          'd) Ellen White é reconhecida como mensageira do Senhor, não como a única profetisa possível.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1805,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre o papel profético de Ellen White:',
        opcoes: [
          'a) Ellen White afirmou que a Bíblia é o critério supremo pelo qual todos os ensinamentos devem ser testados.',
          'b) Seus escritos provêm conforto, orientação e correção à Igreja adventista.',
          'c) Os escritos de Ellen White substituem a necessidade do estudo individual da Bíblia para membros adventistas.',
          'd) O adventismo entende seu ministério como cumprimento da promessa do dom profético no tempo do fim.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1806,
        categoria: 'vf',
        enunciado: 'O adventismo considera os escritos de Ellen White iguais à Bíblia em autoridade, podendo seus ensinamentos corrigir ou suplantar doutrinas bíblicas.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo afirma que a Bíblia é o padrão supremo e que os escritos de Ellen White são subordinados a ela. Ellen White mesma afirmou que a Bíblia é o único teste de toda doutrina e experiência.',
      },
      {
        id: 1807,
        categoria: 'apologetica',
        enunciado: 'Alguém critica: "Adventistas colocam Ellen White acima da Bíblia — isso é heresia." Como você responde?',
        opcoes: [
          'a) Concorda que Ellen White tem igual autoridade à Bíblia.',
          'b) Esclarece que o adventismo ensina explicitamente que a Bíblia é a autoridade suprema; Ellen White sempre se colocou abaixo da Bíblia e insistiu que seus escritos devem ser testados pelas Escrituras.',
          'c) Diz que os críticos de Ellen White são inimigos do adventismo e devem ser ignorados.',
          'd) Afirma que Ellen White é mais relevante que a Bíblia para questões práticas da vida.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 19,
    nome: 'A Lei de Deus',
    texto: `Os grandes princípios da lei de Deus estão incorporados nos Dez Mandamentos e exemplificados na vida de Jesus Cristo. Eles expressam o amor, a vontade e os propósitos de Deus em relação à conduta e aos relacionamentos humanos, e são obrigatórios a toda a humanidade.

A lei de Deus não é um meio de salvação — ninguém é justificado pelas obras da lei. Mas ela revela o caráter de Deus e o padrão de retidão que Deus espera; expõe o pecado como transgressão da lei; e serve de mordomo que conduz ao Cristo. O Espírito Santo usa a lei para convencer de pecado, direcionando o pecador à graça salvadora.

O cristão salvo não está sob a lei como modo de justificação, mas ama a lei de Deus como expressão do caráter do Ser que o salvou. A obediência à lei é o fruto natural do amor a Deus e a resposta da gratidão à salvação recebida. Jesus veio cumprir, não abolir a lei — e aquele que O ama guarda Seus mandamentos.`,
    perguntas: [
      {
        id: 1901,
        categoria: 'certa',
        enunciado: 'Qual é o triplo papel da Lei de Deus na experiência cristã?',
        opcoes: [
          'a) Justificar o pecador, santificá-lo progressivamente e glorificá-lo no fim.',
          'b) Revelar o pecado, conduzir ao Cristo como tutor, e servir de guia para a vida do crente salvo.',
          'c) Substituir o evangelho, definir os requisitos de salvação e julgar os mortos.',
          'd) Separar judeus de gentios, definir rituais de adoração e estruturar a vida social.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1902,
        categoria: 'certa',
        enunciado: 'O que Jesus afirmou sobre Sua relação com a lei em Mateus 5:17?',
        opcoes: [
          'a) Que veio para abolir a lei e os profetas com Sua nova aliança.',
          'b) Que veio não para abolir, mas para cumprir a lei — e que nem um jota ou um til passaria dela.',
          'c) Que a lei era apenas para os judeus e que os gentios estão livres de seus requisitos.',
          'd) Que os Dez Mandamentos seriam substituídos por um único mandamento de amor.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1903,
        categoria: 'certa',
        enunciado: 'Como o adventismo entende a relação entre graça e lei na vida cristã?',
        opcoes: [
          'a) A graça cancela a obrigação de obedecer à lei — o cristão está completamente livre dos mandamentos.',
          'b) Graça e lei se complementam: a graça nos salva sem merecer; a lei, amada pelo coração renovado, guia o estilo de vida do salvo.',
          'c) A lei salva progressivamente quem a obedece; a graça é necessária apenas no início.',
          'd) A lei foi completamente abolida no Novo Testamento e substituída por princípios gerais de amor.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 1904,
        categoria: 'incorreta',
        enunciado: 'Sobre a lei de Deus no adventismo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) Os Dez Mandamentos expressam os grandes princípios do caráter de Deus.',
          'b) A lei revela o pecado — sem ela não sabemos o que é pecado (Rm 3:20).',
          'c) A obediência perfeita aos Dez Mandamentos é o requisito para obter a salvação.',
          'd) O cristão obedece à lei por amor a Deus, não para ganhar sua salvação.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1905,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a lei de Deus:',
        opcoes: [
          'a) A lei de Deus é eterna como o próprio Deus — Seu caráter não muda.',
          'b) A lei serve como tutor que conduz ao Cristo (Gl 3:24).',
          'c) Paulo ensina que a graça nos liberta para pecar sem consequências, já que a lei foi abolida.',
          'd) A lei é santa, justa e boa (Rm 7:12), mesmo que não possa salvar.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 1906,
        categoria: 'vf',
        enunciado: 'O adventismo ensina que os cristãos salvos pela graça estão livres para descumprir os Dez Mandamentos, pois a lei foi abolida por Cristo.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo ensina que a graça não cancela a lei moral. O crente salvo ama a lei de Deus como expressão do caráter do Ser que o salvou e a obedece por amor, não como meio de salvação.',
      },
      {
        id: 1907,
        categoria: 'apologetica',
        enunciado: 'Um cristão diz: "Você adventista ainda guarda os mandamentos? Isso é legalismo!" Como você responde?',
        opcoes: [
          'a) Concorda que guardar os mandamentos é legalismo e abandona a prática.',
          'b) Explica que obediência por amor não é legalismo — legalismo é tentar ser salvo pelas obras; o adventismo guarda os mandamentos como resposta de amor à salvação já recebida pela graça.',
          'c) Diz que guarda os mandamentos para garantir sua salvação final.',
          'd) Afirma que os cristãos que não guardam os mandamentos não são verdadeiramente salvos.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 20,
    nome: 'O Sábado',
    texto: `O Deus benevolente, depois de ter criado os céus e a terra e tudo que neles há em seis dias, descansou no sétimo dia. Ele estabeleceu o Sábado para toda a humanidade como memorial da criação. O quarto mandamento da lei imutável de Deus requer a observância do Sábado, o sétimo dia, como dia de descanso, adoração e ministério, em harmonia com o ensino e a prática de Jesus, o Senhor do Sábado.

O Sábado é um símbolo de nossa redenção em Cristo, um sinal de nossa santificação, uma demonstração de nossa lealdade e uma prefiguração de nosso eterno futuro no novo céu e nova terra. A guarda do Sábado vai do pôr do sol de sexta-feira ao pôr do sol de sábado — um período sagrado de comunhão com Deus e com a família eclesial.

O adventismo observa o sétimo dia (sábado) e não o domingo, baseado no texto bíblico, na continuidade do mandamento do Sábado e na ausência de qualquer texto bíblico que transfira a observância para o primeiro dia da semana.`,
    perguntas: [
      {
        id: 2001,
        categoria: 'certa',
        enunciado: 'Quando começa e termina o Sábado segundo a prática adventista baseada na Bíblia?',
        opcoes: [
          'a) Da meia-noite de sexta-feira à meia-noite de sábado, conforme o calendário gregoriano.',
          'b) Do pôr do sol de sexta-feira ao pôr do sol de sábado, conforme o padrão bíblico (Lv 23:32).',
          'c) Da manhã de sábado até o amanhecer de domingo, conforme a tradição eclesiástica.',
          'd) Da sexta-feira ao meio-dia de sábado, com o restante reservado para atividades familiares.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2002,
        categoria: 'certa',
        enunciado: 'Qual é o significado teológico do Sábado para o adventismo além do descanso físico?',
        opcoes: [
          'a) O Sábado é apenas um dia de descanso físico sem significado espiritual especial.',
          'b) O Sábado é memorial da criação, símbolo de redenção, sinal de santificação e sinal de lealdade ao Criador e Redentor.',
          'c) O Sábado no Novo Testamento foi transferido para o domingo em memória da ressurreição.',
          'd) O Sábado adventista é uma tradição cultural sem fundamento no mandamento bíblico.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2003,
        categoria: 'certa',
        enunciado: 'Qual base bíblica o adventismo usa para guardar o sétimo dia (sábado) em vez do domingo?',
        opcoes: [
          'a) A tradição apostólica de adoração dominical, registrada nas epístolas de Paulo.',
          'b) O quarto mandamento dos Dez Mandamentos, a prática de Jesus e dos apóstolos, e a ausência de texto bíblico que mude o dia de adoração.',
          'c) A revelação a Ellen White que mandou os adventistas voltar ao sábado.',
          'd) A necessidade de se distinguir dos judeus que observavam o sábado de forma legalista.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2004,
        categoria: 'incorreta',
        enunciado: 'Sobre o Sábado segundo o adventismo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) O Sábado foi instituído por Deus no sétimo dia da semana da criação (Gn 2:2-3).',
          'b) Jesus observou o Sábado e o chamou de Senhor do Sábado (Mc 2:28).',
          'c) A Bíblia contém um texto claro que transfere o dia de adoração do sábado para o domingo.',
          'd) O adventismo guarda o sábado (sétimo dia) por fidelidade ao mandamento bíblico.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2005,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a guarda do Sábado:',
        opcoes: [
          'a) O Sábado é o sétimo dia da semana, que corresponde ao que chamamos de sábado (Saturday).',
          'b) O quarto mandamento especifica guardar o sétimo dia como o dia do Senhor.',
          'c) O Sábado foi somente para os judeus sob a lei mosaica e não se aplica aos cristãos gentios.',
          'd) Jesus afirmou que o Sábado foi feito para o homem, não o homem para o Sábado (Mc 2:27).',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2006,
        categoria: 'vf',
        enunciado: 'O Novo Testamento contém um mandamento explícito que transfere o dia sagrado do sábado (sétimo dia) para o domingo (primeiro dia da semana).',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O Novo Testamento não contém nenhum mandamento explícito que transfira a observância sagrada do sábado para o domingo. A mudança para o domingo foi histórica e eclesiástica, não bíblica, ocorrendo gradualmente nos primeiros séculos da era cristã.',
      },
      {
        id: 2007,
        categoria: 'apologetica',
        enunciado: 'Um pastor cristão diz: "Toda a Igreja guarda o domingo desde os apóstolos — vocês adventistas estão errados." Como você responde?',
        opcoes: [
          'a) Concorda e passa a guardar o domingo.',
          'b) Explica historicamente que a mudança para o domingo foi gradual, eclesiástica e não bíblica; o mandamento do sábado permanece nos Dez Mandamentos sem revogação bíblica.',
          'c) Diz que guardar o domingo é marca da besta e que os dominicais serão perdidos.',
          'd) Afirma que o dia não importa — qualquer dia pode ser guardado como Sábado.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 21,
    nome: 'Mordomia',
    texto: `Somos mordomos de Deus, tendo recebido dEle tempo, oportunidades, capacidades, posses e as bênçãos da terra. Somos responsáveis perante Ele por seu uso correto. Reconhecemos a propriedade de Deus devolvendo-Lhe fielmente o dízimo e ofertas para a proclamação do evangelho e para o sustento da Igreja e de suas obras.

A mordomia cristã abrange mais do que as finanças — inclui o cuidado do corpo como templo do Espírito Santo, o uso sábio do tempo, o desenvolvimento dos talentos e o cuidado do ambiente natural. Tudo o que possuímos vem de Deus e a Ele pertence; somos apenas administradores temporários de Seus bens.

O dízimo (dez por cento da renda) é o padrão bíblico de contribuição financeira reconhecido pelo adventismo. As ofertas são adicionais e voluntárias. Esses recursos sustentam a missão evangelística global da Igreja, o ministério local e a obra social.`,
    perguntas: [
      {
        id: 2101,
        categoria: 'certa',
        enunciado: 'O que é a mordomia cristã segundo o adventismo?',
        opcoes: [
          'a) Apenas a prática de pagar o dízimo mensalmente à Igreja local.',
          'b) A responsabilidade de administrar fielmente tudo o que Deus confiou — tempo, talentos, saúde, posses e o ambiente natural.',
          'c) A obrigação de entregar todos os bens pessoais à Igreja como sinal de santificação.',
          'd) Um programa de finanças pessoais que visa enriquecer o cristão como sinal da bênção de Deus.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2102,
        categoria: 'certa',
        enunciado: 'Qual é o padrão bíblico do dízimo reconhecido pelo adventismo?',
        opcoes: [
          'a) Cinco por cento da renda bruta, ajustável conforme a situação financeira.',
          'b) Dez por cento da renda, retornado a Deus como reconhecimento de Sua propriedade sobre tudo.',
          'c) Vinte por cento dos lucros anuais, devolvidos após o pagamento de todas as dívidas.',
          'd) Qualquer quantia voluntária — a porcentagem não tem base bíblica específica.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2103,
        categoria: 'certa',
        enunciado: 'Por que o adventismo entende o dízimo como devolução, não como doação?',
        opcoes: [
          'a) Porque o dízimo foi estabelecido como imposto religiosos obrigatório para o templo.',
          'b) Porque tudo pertence a Deus — o dízimo é apenas devolvermos a Deus o que já é Dele, não dar algo que é nosso.',
          'c) Porque o dízimo financia exclusivamente os ordenados dos pastores adventistas.',
          'd) Porque a palavra "dízimo" em hebraico significa "presente que enriquece o doador".',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2104,
        categoria: 'incorreta',
        enunciado: 'Sobre a mordomia cristã, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) A mordomia inclui o cuidado do corpo como templo do Espírito Santo.',
          'b) O dízimo é o padrão bíblico de contribuição financeira reconhecido pelo adventismo.',
          'c) A fidelidade no dízimo garante automaticamente prosperidade financeira ao cristão.',
          'd) O uso sábio do tempo é parte essencial da mordomia cristã.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2105,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a mordomia cristã:',
        opcoes: [
          'a) Somos mordomos de Deus, responsáveis pelo uso correto do que Ele nos confiou.',
          'b) O cuidado do ambiente natural faz parte da mordomia cristã.',
          'c) A mordomia financeira libera o cristão de qualquer responsabilidade sobre seu estilo de vida e saúde.',
          'd) As ofertas, além do dízimo, sustentam a missão evangelística da Igreja.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2106,
        categoria: 'vf',
        enunciado: 'O adventismo ensina que pagar o dízimo é um requisito para a salvação — quem não o paga não pode ser salvo.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O dízimo é uma prática de mordomia fiel reconhecida como bíblica, mas não é requisito para a salvação. A salvação é pela graça mediante a fé em Cristo. O não pagamento do dízimo é uma questão de fidelidade, não de salvação.',
      },
      {
        id: 2107,
        categoria: 'apologetica',
        enunciado: 'Alguém diz: "Igrejas só querem dinheiro — o dízimo é uma exploração financeira dos membros." Como você responde?',
        opcoes: [
          'a) Concorda que o dízimo é exploração e que o cristão não tem obrigação financeira com a Igreja.',
          'b) Explica que o dízimo é bíblico e que os recursos sustentam a missão global da Igreja, não o enriquecimento de líderes; a mordomia é uma resposta de gratidão a Deus pelo que recebemos dEle.',
          'c) Diz que Deus abençoa materialmente somente os que pagam o dízimo fielmente.',
          'd) Afirma que a Igreja não precisa de dinheiro para cumprir sua missão.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 22,
    nome: 'Conduta Cristã',
    texto: `Somos chamados a ser um povo piedoso que pensa, sente e age em harmonia com os princípios do céu. Para que o Espírito Santo recrie em nós o caráter de nosso Senhor, dedicamo-nos somente ao que produzirá pureza, saúde e alegria cristãs em nossa vida.

A conduta cristã adventista inclui os princípios de saúde: temperança, abstinência de álcool, tabaco e substâncias prejudiciais, alimentação saudável e exercício físico. O corpo é templo do Espírito Santo e deve ser tratado com responsabilidade. O adventismo enfatiza os princípios de saúde como parte de uma vida holística de consagração a Deus.

O estilo de vida cristão também inclui escolhas conscientes sobre entretenimento, vestimenta e relacionamentos — sempre pautados pelo princípio de glorificar a Deus em tudo. A conduta cristã não é um conjunto de regras legalistas, mas a expressão natural de um coração transformado pelo amor de Cristo.`,
    perguntas: [
      {
        id: 2201,
        categoria: 'certa',
        enunciado: 'O que fundamenta os princípios de conduta cristã do adventismo?',
        opcoes: [
          'a) Regras arbitrárias estabelecidas pelos fundadores adventistas para distinguir a Igreja.',
          'b) O princípio de que o corpo é templo do Espírito Santo e que tudo deve ser feito para a glória de Deus.',
          'c) A tentativa de imitar o estilo de vida dos judeus do Antigo Testamento.',
          'd) Normas de saúde pública modernas que a Igreja adotou como princípios religiosos.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2202,
        categoria: 'certa',
        enunciado: 'Quais substâncias o adventismo pede que seus membros evitem como parte da conduta cristã?',
        opcoes: [
          'a) Apenas alimentos não kosher e gorduras saturadas.',
          'b) Álcool, tabaco e outras substâncias que prejudicam o corpo ou a mente.',
          'c) Qualquer alimento de origem animal, incluindo laticínios e ovos.',
          'd) Cafeína em todas as suas formas, incluindo chás e chocolates.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2203,
        categoria: 'certa',
        enunciado: 'Como o adventismo entende os princípios de saúde em relação à fé?',
        opcoes: [
          'a) Os princípios de saúde são requisitos para a salvação — quem não os segue não pode ser salvo.',
          'b) Os princípios de saúde são parte integral da vida de consagração a Deus — cuidar do corpo é forma de honrá-Lo.',
          'c) Os princípios de saúde são apenas recomendações opcionais sem base bíblica.',
          'd) Apenas os membros em posição de liderança são obrigados a seguir os princípios de saúde.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2204,
        categoria: 'incorreta',
        enunciado: 'Sobre a conduta cristã adventista, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) A conduta cristã inclui escolhas conscientes sobre entretenimento, vestimenta e relacionamentos.',
          'b) A abstinência de álcool e tabaco é parte dos princípios de saúde adventistas.',
          'c) A conduta cristã é apenas um conjunto de regras externas sem relação com a transformação interior.',
          'd) Os princípios de saúde adventistas visam preservar o corpo como templo do Espírito Santo.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2205,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre o estilo de vida adventista:',
        opcoes: [
          'a) O adventismo promove temperança — moderação ou abstinência das coisas prejudiciais.',
          'b) O cuidado com a saúde física é considerado parte da espiritualidade adventista.',
          'c) O adventismo ensina que o cristão pode praticar qualquer estilo de vida, pois é salvo pela graça.',
          'd) A dieta adventista recomenda evitar carnes consideradas impuras no Antigo Testamento.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2206,
        categoria: 'vf',
        enunciado: 'Os princípios de saúde adventistas (evitar álcool, tabaco, dieta saudável) são apenas tradições culturais sem fundamento bíblico.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo fundamenta seus princípios de saúde em textos bíblicos como 1 Coríntios 6:19-20 (corpo como templo do Espírito) e 1 Coríntios 10:31 (fazer tudo para a glória de Deus), além das leis alimentares do Antigo Testamento.',
      },
      {
        id: 2207,
        categoria: 'apologetica',
        enunciado: 'Alguém diz: "Adventistas são muito rígidos com comida e bebida — isso é legalismo desnecessário." Como você responde?',
        opcoes: [
          'a) Concorda que os princípios de saúde são legalismo e os abandona.',
          'b) Explica que cuidar do corpo como templo do Espírito não é legalismo, mas uma expressão de amor e respeito ao Deus que nos criou e redimiu — um estilo de vida motivado por gratidão, não por medo.',
          'c) Diz que quem não segue os princípios de saúde adventistas será perdido.',
          'd) Afirma que os princípios de saúde são apenas para adventistas; os outros cristãos estão livres.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 23,
    nome: 'Casamento e a Família',
    texto: `O casamento foi divinamente estabelecido no Éden e confirmado por Jesus como sendo a união vitalícia entre um homem e uma mulher em amor compartilhado. Para o cristão, o compromisso matrimonial pertence a Deus, tanto quanto ao cônjuge. É para ser vivido em igualdade de parceiros, plenos de amor, honra, respeito e responsabilidade.

A família é a base da sociedade e da Igreja. Os pais têm a responsabilidade de criar os filhos no temor e instrução do Senhor, sendo modelos de fé, amor e integridade. Os filhos têm a responsabilidade de honrar seus pais. A família deve ser um laboratório de graça onde o amor de Deus é experimentado e demonstrado.

O adventismo defende a santidade do casamento como aliança entre um homem e uma mulher, baseado no padrão bíblico desde a criação. A fidelidade sexual dentro do casamento e a abstinência fora dele são os padrões bíblicos. O divórcio, embora possível em certas circunstâncias, não é o ideal de Deus para o casamento.`,
    perguntas: [
      {
        id: 2301,
        categoria: 'certa',
        enunciado: 'O que o adventismo ensina sobre a origem e natureza do casamento?',
        opcoes: [
          'a) O casamento é uma instituição humana cultural que varia conforme os costumes de cada sociedade.',
          'b) O casamento foi divinamente estabelecido no Éden como aliança vitalícia entre um homem e uma mulher.',
          'c) O casamento é apenas um contrato civil sem dimensão espiritual ou sagrada.',
          'd) O casamento é uma concessão para os que não conseguem o celibato — a solteirice é o ideal espiritual.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2302,
        categoria: 'certa',
        enunciado: 'Qual responsabilidade os pais têm em relação aos filhos segundo o ensino adventista?',
        opcoes: [
          'a) Apenas prover sustento material e educação secular — a formação espiritual é responsabilidade da Igreja.',
          'b) Criar os filhos no temor e instrução do Senhor, sendo modelos de fé, amor e integridade.',
          'c) Transmitir sua cultura e tradições adventistas independentemente das escolhas pessoais dos filhos.',
          'd) Decidir a profissão e o parceiro matrimonial dos filhos conforme os princípios cristãos.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2303,
        categoria: 'certa',
        enunciado: 'Qual é o padrão adventista para a sexualidade humana?',
        opcoes: [
          'a) A sexualidade é um dom divino que pode ser expressa em qualquer relacionamento consensual entre adultos.',
          'b) A fidelidade sexual dentro do casamento e a abstinência fora dele são os padrões bíblicos para o cristão.',
          'c) O celibato é superior ao casamento para todos os que buscam a perfeição espiritual.',
          'd) A sexualidade é um assunto privado sem relevância para a espiritualidade ou a doutrina.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2304,
        categoria: 'incorreta',
        enunciado: 'Sobre o casamento e a família segundo o adventismo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) O casamento foi estabelecido por Deus no Éden antes da entrada do pecado.',
          'b) A família é a base da sociedade e da Igreja, sendo fundamental para a formação do caráter.',
          'c) O adventismo não tem posição sobre a definição bíblica de casamento, deixando cada cultura decidir.',
          'd) Os cônjuges são chamados a viver em igualdade, amor mútuo, honra e responsabilidade.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2305,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a família cristã segundo o adventismo:',
        opcoes: [
          'a) A família deve ser um espaço onde o amor de Deus é experimentado e demonstrado.',
          'b) Os filhos têm a responsabilidade bíblica de honrar seus pais.',
          'c) O divórcio é proibido absolutamente em qualquer circunstância pelo ensinamento adventista.',
          'd) Os pais devem ser modelos de fé e integridade para os filhos.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2306,
        categoria: 'vf',
        enunciado: 'O adventismo considera o casamento uma aliança sagrada entre um homem e uma mulher, baseado no padrão bíblico desde a criação.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Verdadeiro',
        justificativa: 'O adventismo baseia sua compreensão de casamento no padrão bíblico de Gênesis 2:24 e confirmado por Jesus em Mateus 19:4-6: uma união entre um homem e uma mulher, estabelecida por Deus no Éden.',
      },
      {
        id: 2307,
        categoria: 'apologetica',
        enunciado: 'Alguém diz: "Com tantos divórcios na Igreja, como vocês podem falar de santidade do casamento?" Como você responde?',
        opcoes: [
          'a) Concorda que o ideal bíblico do casamento é impossível e deve ser relativizado.',
          'b) Reconhece que os cristãos falham, mas isso não invalida o ideal bíblico — a Igreja deve continuar proclamando e vivendo o padrão de Deus enquanto oferece graça e restauração aos que falham.',
          'c) Diz que divórcios na Igreja provam que o casamento cristão não é diferente do secular.',
          'd) Afirma que os divorciados na Igreja perderam completamente sua posição espiritual.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 24,
    nome: 'O Ministério de Cristo no Santuário Celestial',
    texto: `Existe um santuário no céu, o verdadeiro tabernáculo levantado pelo Senhor, e não pelos homens. No santuário celestial, Cristo ministra em nosso favor, tornando os benefícios de Seu sacrifício expiatório disponíveis aos que se arrependem. Sua mediação é essencial e contínua.

Em 1844, no cumprimento da profecia de Daniel 8:14, iniciou-se a fase do julgamento investigativo no ministério de Cristo no santuário celestial. Neste julgamento, também chamado de julgamento préadventista, os registros da vida de todos os que professaram seguir a Deus são examinados. O julgamento vindicará os justos e revelará quem permanece em Cristo.

Esta doutrina é única ao adventismo e fundamenta seu senso de urgência e seu entendimento da hora presente. Saber que estamos no tempo do julgamento investigativo convida a um exame de vida, à confiança plena em Cristo como nosso Advogado, e à urgência da missão evangelística.`,
    perguntas: [
      {
        id: 2401,
        categoria: 'certa',
        enunciado: 'O que o adventismo entende pelo "julgamento investigativo" que teve início em 1844?',
        opcoes: [
          'a) Um julgamento histórico humano que condenou inocentes e iniciou a era adventista.',
          'b) A fase de julgamento no ministério celestial de Cristo em que os registros de vida dos crentes são examinados para vindicar os justos.',
          'c) Um processo de autoavaliação espiritual que os adventistas devem realizar anualmente.',
          'd) O início do período de tribulação que precederá imediatamente a segunda vinda de Cristo.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2402,
        categoria: 'certa',
        enunciado: 'Qual profecia de Daniel serve de base para a doutrina do santuário celestial e o ano de 1844?',
        opcoes: [
          'a) Daniel 2 — a estátua de Nabucodonosor com seus impérios mundiais.',
          'b) Daniel 8:14 — "Até duas mil e trezentas tardes e manhãs; então o santuário será purificado."',
          'c) Daniel 7:13 — "o Filho do homem chegava com as nuvens do céu."',
          'd) Daniel 12:1 — "naquele tempo levantarse-á Miguel, o grande príncipe."',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2403,
        categoria: 'certa',
        enunciado: 'Como o ministério intercessor de Cristo no santuário celestial beneficia o crente hoje?',
        opcoes: [
          'a) Garante que o crente nunca precisará de arrependimento após a conversão inicial.',
          'b) Torna os benefícios do sacrifício de Cristo continuamente disponíveis para os que se arrependem e creem.',
          'c) Substitui a necessidade de vida cristã ativa, pois Cristo garante automaticamente a aprovação divina.',
          'd) O ministério celestial de Cristo é apenas administrativo e não beneficia diretamente o crente.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2404,
        categoria: 'incorreta',
        enunciado: 'Sobre o santuário celestial e o ministério de Cristo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) O santuário terrestre do Antigo Testamento era uma cópia do original celestial (Hb 8:2,5).',
          'b) Cristo é o nosso Sumo Sacerdote que ministra no santuário celestial.',
          'c) O julgamento investigativo iniciado em 1844 já determinou definitivamente quem será salvo, sem possibilidade de mudança.',
          'd) A fase do julgamento investigativo é baseada na profecia de Daniel 8:14.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2405,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a doutrina do santuário adventista:',
        opcoes: [
          'a) O tabernáculo mosaico era uma figura do santuário celestial onde Cristo ministra.',
          'b) Cristo é nosso Advogado e Intercessor no santuário celestial (1 Jo 2:1).',
          'c) A purificação do santuário em 1844 se refere à limpeza de um edifício físico que havia sido profanado.',
          'd) O adventismo vê o julgamento investigativo como vindicação do caráter de Deus no Grande Conflito.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2406,
        categoria: 'vf',
        enunciado: 'A doutrina adventista do santuário ensina que em 1844 Cristo voltou à terra invisivelmente, não que iniciou uma nova fase de Seu ministério celestial.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'Em 1844, o adventismo ensina que Cristo iniciou uma nova fase de Seu ministério no santuário celestial — o julgamento investigativo — não que voltou à terra. A segunda vinda física e visível ainda está no futuro.',
      },
      {
        id: 2407,
        categoria: 'apologetica',
        enunciado: 'Um cristão pergunta: "Por que vocês adventistas inventaram essa doutrina do santuário depois que o Cristo não voltou em 1844?" Como você explica?',
        opcoes: [
          'a) Concorda que a doutrina do santuário foi inventada para encobrir uma falha profética.',
          'b) Explica que o erro de 1844 não foi o ano, mas o evento esperado — não o retorno terrestre, mas o início do ministério de julgamento no santuário celestial, conforme Daniel 8:14.',
          'c) Diz que Cristo de fato voltou em 1844, mas de forma invisível e espiritual.',
          'd) Afirma que os críticos estão errados e que 1844 não tem nenhuma importância para o adventismo.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 25,
    nome: 'A Segunda Vinda de Cristo',
    texto: `A segunda vinda de Cristo é a esperança abençoada da Igreja, o grande clímax do evangelho. O Salvador virá literalmente em glória pessoal, visível e de forma audível. Ao voltar, Ele ressuscitará os mortos justos e, juntamente com os justos vivos, os transformará e os levará para o céu.

O retorno de Cristo será precedido por sinais que Ele mesmo predisse: guerras, rumores de guerras, terremotos, apostasia, pregação do evangelho a todas as nações. Nenhum homem sabe o dia nem a hora, mas os sinais indicam que a vinda está próxima. Os crentes devem estar sempre prontos — não com ansiedade, mas com esperança viva.

A segunda vinda é o evento que resolverá definitivamente o Grande Conflito, ressuscitará os justos, destruirá o pecado e estabelecerá o reino eterno de Deus. É o fundamento da esperança adventista e o horizonte que dá sentido e urgência a toda a missão e vida cristã.`,
    perguntas: [
      {
        id: 2501,
        categoria: 'certa',
        enunciado: 'Como será a segunda vinda de Cristo segundo o ensino bíblico e adventista?',
        opcoes: [
          'a) Cristo voltará secretamente para arrebatar os crentes sem que o mundo perceba.',
          'b) Cristo voltará de forma literal, pessoal, visível e audível — todo olho O verá (Ap 1:7).',
          'c) Cristo já voltou espiritualmente em 1844 inaugurando Seu reino invisível na terra.',
          'd) A segunda vinda é metáfora da conversão pessoal e não um evento histórico futuro.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2502,
        categoria: 'certa',
        enunciado: 'O que acontecerá com os mortos justos na segunda vinda de Cristo?',
        opcoes: [
          'a) Os mortos justos já estão no céu e descerão com Cristo para se reunir a seus corpos.',
          'b) Os mortos justos ressuscitarão em corpos glorificados para se encontrar com Cristo.',
          'c) Os mortos permanecem mortos até o milênio — apenas os vivos serão transformados na segunda vinda.',
          'd) Apenas os que morreram como mártires serão ressuscitados na segunda vinda.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2503,
        categoria: 'certa',
        enunciado: 'Por que o adventismo chama a segunda vinda de "esperança abençoada"?',
        opcoes: [
          'a) Porque é um evento terrível de juízo que os crentes devem temer com tremor.',
          'b) Porque é o clímax do evangelho — a realização de todas as promessas de Deus, a ressurreição dos mortos e a inauguração da eternidade com Deus.',
          'c) Porque permite que os adventistas fujam da tribulação antes que ela começa.',
          'd) Porque a segunda vinda é uma metáfora do crescimento espiritual que cada crente experimenta.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2504,
        categoria: 'incorreta',
        enunciado: 'Sobre a segunda vinda de Cristo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) A segunda vinda será um evento literal, visível e global — não secreto ou espiritual.',
          'b) Sinais preditos por Jesus indicam a proximidade do retorno de Cristo.',
          'c) Jesus revelou o dia e a hora exata de Sua segunda vinda para que possamos nos preparar.',
          'd) A segunda vinda é a esperança abençoada que fundamenta a urgência da missão adventista.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2505,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre o retorno de Cristo:',
        opcoes: [
          'a) Cristo voltará em glória pessoal com todos os santos anjos (Mt 25:31).',
          'b) Todo olho O verá quando Ele vier — incluindo aqueles que O transpassaram (Ap 1:7).',
          'c) A segunda vinda é um evento secreto de "arrebatamento" que ocorrerá sem que o mundo perceba.',
          'd) Na segunda vinda, Cristo transformará em corpos glorificados os vivos e ressuscitados justos.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2506,
        categoria: 'vf',
        enunciado: 'O adventismo ensina que Jesus voltará secretamente (arrebatamento secreto) antes de um período de tribulação de sete anos, após o qual voltará visivelmente.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo rejeita a doutrina do arrebatamento secreto. A segunda vinda será única, literal, visível, global e audível — todo olho O verá (Ap 1:7). A teoria do arrebatamento secreto não tem base nas Escrituras, segundo o adventismo.',
      },
      {
        id: 2507,
        categoria: 'apologetica',
        enunciado: 'Um evangélico defende o arrebatamento secreto: "Jesus virá duas vezes: primeiro em segredo, depois visivelmente." Como você responde biblicamente?',
        opcoes: [
          'a) Concorda com a doutrina do arrebatamento secreto.',
          'b) Aponta que Mateus 24:27, Apocalipse 1:7 e 1 Tessalonicenses 4:16-17 descrevem uma segunda vinda visível, audível e global — sem espaço bíblico para um retorno secreto.',
          'c) Diz que a questão do arrebatamento é irrelevante para a salvação e deve ser ignorada.',
          'd) Afirma que os adventistas também creem no arrebatamento, mas em versão diferente.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 26,
    nome: 'Morte e Ressurreição',
    texto: `O salário do pecado é a morte. Mas Deus, que somente tem imortalidade, concederá vida eterna aos Seus redimidos. Até aquele dia, a morte é para todos os homens um estado de inconsciência. Quando Cristo, que é a nossa vida, aparecer, os ressuscitados e os vivos justos serão glorificados e arrebatados para encontrarem seu Senhor.

A ressurreição dos justos é a primeira ressurreição — ocorre na segunda vinda de Cristo. A ressurreição dos ímpios — a segunda ressurreição — ocorre mil anos depois, no final do milênio, para o julgamento final. Estas duas ressurreições entendem que todos os mortos dormem inconscientemente até que Jesus volte.

A crença na ressurreição dá esperança distinta ao cristão diante da morte: não o medo do purgatório nem a especulação sobre uma alma errante, mas a certeza de que Jesus voltará para despertar os que dormem nEle. O sepulcro não é o fim — é apenas a antessala da ressurreição.`,
    perguntas: [
      {
        id: 2601,
        categoria: 'certa',
        enunciado: 'Quando ocorrerá a ressurreição dos justos segundo o adventismo?',
        opcoes: [
          'a) Imediatamente após a morte de cada justo, individualmente.',
          'b) Na segunda vinda de Cristo — os mortos em Cristo ressuscitarão primeiro (1 Ts 4:16).',
          'c) No final do milênio, juntamente com a ressurreição dos ímpios.',
          'd) Em momentos diferentes ao longo da história, conforme a maturidade espiritual de cada um.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2602,
        categoria: 'certa',
        enunciado: 'Qual é a diferença entre a primeira e a segunda ressurreição segundo o adventismo?',
        opcoes: [
          'a) A primeira ressurreição é espiritual (conversão) e a segunda é física (retorno de Cristo).',
          'b) A primeira ressurreição (dos justos) ocorre na segunda vinda; a segunda ressurreição (dos ímpios) ocorre ao final do milênio para o julgamento final.',
          'c) Ambas as ressurreições ocorrem simultaneamente na segunda vinda de Cristo.',
          'd) A primeira ressurreição é para os mártires; a segunda é para todos os demais justos.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2603,
        categoria: 'certa',
        enunciado: 'Como a doutrina da ressurreição difere da crença em imortalidade da alma?',
        opcoes: [
          'a) A ressurreição é necessária apenas para o corpo; a alma já está consciente com Deus após a morte.',
          'b) Na ressurreição, todo o ser — corpo e personalidade — é restaurado por Deus; não há necessidade de uma alma separada que sobreviva à morte.',
          'c) A ressurreição e a imortalidade da alma são doutrinas equivalentes que o adventismo usa intercambiavelmente.',
          'd) O adventismo crê em ambas: imortalidade da alma agora e ressurreição do corpo no futuro.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2604,
        categoria: 'incorreta',
        enunciado: 'Sobre morte e ressurreição no adventismo, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) Os mortos permanecem inconscientes até a ressurreição — a morte é como um sono.',
          'b) Na segunda vinda, Cristo ressuscitará os mortos justos em corpos glorificados.',
          'c) Os mortos que morreram em Cristo estão atualmente conscientes no céu, aguardando seus corpos.',
          'd) A imortalidade não é inerente ao ser humano — é um dom de Deus concedido na ressurreição.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2605,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre as duas ressurreições:',
        opcoes: [
          'a) A ressurreição dos justos é chamada de "primeira ressurreição" em Apocalipse 20.',
          'b) Bem-aventurado e santo é o que tem parte na primeira ressurreição (Ap 20:6).',
          'c) Os ímpios serão ressuscitados na segunda vinda de Cristo ao mesmo tempo que os justos.',
          'd) A segunda ressurreição, dos ímpios, ocorre ao final do milênio para o julgamento final.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2606,
        categoria: 'vf',
        enunciado: 'O adventismo ensina que ao morrer, o crente vai imediatamente ao céu de forma consciente, aguardando apenas o corpo glorificado para ser entregue na segunda vinda.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo ensina o sono dos mortos: ao morrer, o crente entra em estado de total inconsciência até a ressurreição. Na segunda vinda de Cristo, os mortos justos ressuscitam completos — não apenas recebem corpos de almas que já estavam conscientes.',
      },
      {
        id: 2607,
        categoria: 'apologetica',
        enunciado: 'Alguém enlutado diz: "Minha mãe está no céu agora olhando para mim — isso me consola." Como você responde com sensibilidade mas fidelidade bíblica?',
        opcoes: [
          'a) Diz duramente que a mãe está dormindo e não pode ver nada, destruindo o consolo.',
          'b) Com compaixão, explica que a Bíblia oferece consolação ainda maior: a mãe descansa em paz, inconsciente ao sofrimento, e Jesus virá para despertá-la na ressurreição — um reencontro real e certo.',
          'c) Concorda que a mãe está consciente no céu para não causar mais dor.',
          'd) Diz que a questão de onde está a mãe é irrelevante e que o consolo é o que importa.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 27,
    nome: 'O Milênio e o Fim do Pecado',
    texto: `O milênio é o reinado de mil anos de Cristo com Seus santos no céu entre a primeira e a segunda ressurreição. Durante este período, os ímpios mortos permanecerão na terra desolada e os vivos ímpios serão destruídos pela glória da vinda de Cristo. A terra ficará desabitada.

Durante o milênio, os santos participarão do julgamento dos ímpios, examinando os registros para entender a justiça das decisões divinas. No fim do milênio, Cristo e os santos descerão à terra, a Nova Jerusalém descerá do céu, e os ímpios serão ressuscitados para o julgamento final.

No grande julgamento final, os ímpios, incluindo Satanás, serão destruídos pelo fogo — o chamado "lago de fogo", que é a morte segunda. Isso não é tormento eterno consciente, mas destruição completa e final. O pecado e os pecadores que o escolheram serão eliminados para sempre, limpando o universo de toda maldade.`,
    perguntas: [
      {
        id: 2701,
        categoria: 'certa',
        enunciado: 'O que acontecerá na terra durante o milênio segundo o adventismo?',
        opcoes: [
          'a) Cristo reinará visivelmente na terra com os santos durante os mil anos.',
          'b) A terra ficará desolada e desabitada — os ímpios mortos e os vivos destruídos pela vinda de Cristo.',
          'c) Os ímpios sobreviventes terão mil anos para se arrepender antes do julgamento final.',
          'd) A terra continuará normalmente, mas governada pelos santos que ficaram.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2702,
        categoria: 'certa',
        enunciado: 'Qual é o propósito do milênio para os santos no céu?',
        opcoes: [
          'a) Os santos descansarão no céu após a tribulação, sem atividades específicas.',
          'b) Os santos participarão do julgamento dos ímpios, examinando registros para compreender a justiça das decisões divinas.',
          'c) Os santos construirão a Nova Jerusalém durante o milênio para sua habitação eterna.',
          'd) Os santos evangelizarão os anjos que não se decidiram durante o conflito universal.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2703,
        categoria: 'certa',
        enunciado: 'O que o adventismo entende pela "segunda morte" mencionada em Apocalipse?',
        opcoes: [
          'a) Um estado de tormento eterno consciente no inferno para os ímpios.',
          'b) A destruição final e completa dos ímpios — o lago de fogo que elimina definitivamente o pecado e os que escolheram o pecado.',
          'c) Uma segunda oportunidade de salvação para os que não tiveram chance na primeira vida.',
          'd) A morte do pecado que ocorre na conversão do pecador — o "antigo homem" morre.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2704,
        categoria: 'incorreta',
        enunciado: 'Sobre o milênio, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) O milênio dura mil anos — período entre a primeira e segunda ressurreição.',
          'b) Durante o milênio, os santos reinarão com Cristo no céu (Ap 20:4).',
          'c) Durante o milênio, Cristo governará visível e fisicamente um reino terrestre em Jerusalém.',
          'd) No fim do milênio, a Nova Jerusalém descerá do céu para a terra.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2705,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre o fim do pecado:',
        opcoes: [
          'a) Satanás e seus anjos serão destruídos no julgamento final — o lago de fogo.',
          'b) O resultado do julgamento final é a extinção completa do pecado do universo.',
          'c) O lago de fogo representa tormento eterno consciente para os ímpios que nunca terminará.',
          'd) Após o julgamento final, o universo será limpo de toda maldade para sempre.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2706,
        categoria: 'vf',
        enunciado: 'O adventismo ensina que o inferno é um lugar de tormento eterno consciente onde os ímpios sofrerão para sempre sem fim.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo rejeita o tormento eterno consciente. Baseado em textos como Malaquias 4:1 e Apocalipse 20:9, ensina que os ímpios serão destruídos completamente — a segunda morte é extinção, não tormento interminável.',
      },
      {
        id: 2707,
        categoria: 'apologetica',
        enunciado: 'Um cristão diz: "Adventistas não acreditam no inferno — então o pecado não tem consequências sérias." Como você responde?',
        opcoes: [
          'a) Concorda que sem tormento eterno não há motivação para evitar o pecado.',
          'b) Explica que o adventismo leva o pecado muito a sério — a segunda morte (destruição completa) é consequência gravíssima; não há necessidade de tormento eterno para tornar as consequências sérias.',
          'c) Diz que o tormento eterno é a posição correta e que o adventismo errou neste ponto.',
          'd) Afirma que as consequências do pecado são apenas para esta vida — não há julgamento após a morte.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
  {
    id: 28,
    nome: 'A Nova Terra',
    texto: `Na nova terra, em que habitará a justiça, Deus proporcionará um lar eterno para os redimidos e um ambiente perfeito para a vida eterna, o amor, a alegria e o aprendizado em Sua presença. Porque Deus mesmo habitará com Seu povo, e haverá nova terra e novo céu.

A Nova Jerusalém, a cidade santa, descerá do céu para se tornar a capital do novo mundo. Não haverá mais morte, luto, choro ou dor. A maldição do pecado será removida completamente. Os redimidos adorarão a Deus, aprenderão, trabalharão criativamente, explorarão a criação e desfrutarão de comunhão perfeita com Deus e uns com os outros por toda a eternidade.

A esperança da nova terra é o horizonte último que dá sentido a toda a vida cristã neste mundo. Os sofrimentos deste tempo presente não são dignos de comparação com a glória que será revelada. A nova terra não é uma existência desencarnada e flutuante, mas uma vida plenamente humana e redimida — com corpos glorificados, mundo físico restaurado e comunhão eterna com o Criador.`,
    perguntas: [
      {
        id: 2801,
        categoria: 'certa',
        enunciado: 'O que o adventismo ensina sobre a natureza da vida eterna na nova terra?',
        opcoes: [
          'a) Será uma existência espiritual desencarnada, onde os redimidos existirão como espíritos sem corpos.',
          'b) Será uma vida plenamente humana e redimida — com corpos glorificados, mundo físico restaurado e comunhão eterna com Deus.',
          'c) Será um estado de nirvana eterno onde a individualidade se dissolve na presença divina.',
          'd) Será limitada a adoração contínua sem variedade de atividades ou descobertas.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2802,
        categoria: 'certa',
        enunciado: 'O que Apocalipse 21 revela sobre a Nova Jerusalém e a nova terra?',
        opcoes: [
          'a) A Nova Jerusalém é o estado espiritual da Igreja militante neste mundo atual.',
          'b) Deus habitará com Seu povo — não haverá mais morte, luto, choro ou dor — e Ele fará novas todas as coisas.',
          'c) A Nova Jerusalém será estabelecida na terra atual após o retorno de Cristo e antes do milênio.',
          'd) A nova terra é um lugar intermediário entre a terra atual e o céu eterno.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2803,
        categoria: 'certa',
        enunciado: 'Por que a esperança da nova terra é importante para a vida cristã presente?',
        opcoes: [
          'a) Ela motiva os crentes a evitar qualquer engajamento com o mundo presente.',
          'b) Ela dá perspectiva eterna ao sofrimento presente e fundamenta a esperança que sustenta o cristão nas tribulações desta vida.',
          'c) Ela dispensa o cristão de responsabilidade pela criação presente, já que tudo será renovado de qualquer forma.',
          'd) A esperança da nova terra é apenas um consolo psicológico sem realidade objetiva.',
        ],
        resposta_correta: 'b',
      },
      {
        id: 2804,
        categoria: 'incorreta',
        enunciado: 'Sobre a nova terra, marque a afirmativa INCORRETA:',
        opcoes: [
          'a) Na nova terra não haverá mais morte, luto, choro ou dor (Ap 21:4).',
          'b) Os redimidos habitarão na Nova Jerusalém, que descerá do céu para a terra.',
          'c) A nova terra será habitada apenas por almas espirituais sem corpos físicos glorificados.',
          'd) Na nova terra, Deus mesmo habitará com Seu povo — Ele será o seu Deus (Ap 21:3).',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2805,
        categoria: 'incorreta',
        enunciado: 'Identifique a afirmação INCORRETA sobre a esperança adventista da nova terra:',
        opcoes: [
          'a) Os redimidos adorarão, aprenderão e desfrutarão de atividade criativa na nova terra.',
          'b) A maldição do pecado será completamente removida na nova criação.',
          'c) A nova terra é apenas uma metáfora poética para a paz espiritual que o cristão experimenta agora.',
          'd) Os redimidos terão corpos glorificados na nova terra — não serão espíritos etéreos.',
        ],
        resposta_correta: 'c',
      },
      {
        id: 2806,
        categoria: 'vf',
        enunciado: 'Segundo o adventismo, a vida eterna na nova terra será uma existência etérea e desencarnada, onde os redimidos existirão como espíritos imateriais adorando a Deus eternamente.',
        opcoes: ['Verdadeiro', 'Falso'],
        resposta_correta: 'Falso',
        justificativa: 'O adventismo ensina que a vida eterna será plenamente corporal e humana — com corpos glorificados em um mundo físico renovado. A ressurreição é corporal, não dissolução da identidade pessoal. A nova terra será real, física e habitável.',
      },
      {
        id: 2807,
        categoria: 'apologetica',
        enunciado: 'Um cético diz: "O céu parece entediante — ficar cantando para Deus para sempre." Como você descreve a esperança adventista da nova terra?',
        opcoes: [
          'a) Concorda que o céu é monótono e que a vida presente é mais interessante.',
          'b) Descreve que a nova terra inclui aprendizado ilimitado, trabalho criativo, exploração da criação, comunhão com os redimidos de todas as eras — uma vida mais rica e plena do que qualquer coisa neste mundo pode oferecer.',
          'c) Diz que o céu exige que abandonemos todos os interesses humanos para ser puramente espirituais.',
          'd) Afirma que a nova terra é apenas para os adventistas que foram perfeitos nesta vida.',
        ],
        resposta_correta: 'b',
      },
    ],
  },
];

export function getDoctrine(id: number): Doctrine | undefined {
  return DOCTRINES.find((d) => d.id === id);
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function selectQuestionsForBlock(
  block: 'block1' | 'block2' | 'provao',
  currentDoctrineId: number,
  completedDoctrines: number[],
): import('../types').Question[] {
  const currentDoctrine = DOCTRINES.find((d) => d.id === currentDoctrineId);
  if (!currentDoctrine) return [];

  const getByCategory = (cat: import('../types').QuestionCategory) =>
    shuffleArray(currentDoctrine.perguntas.filter((q) => q.categoria === cat));

  if (block === 'block1') {
    const certas = getByCategory('certa').slice(0, 2);
    const vfs = getByCategory('vf').slice(0, 2);
    const apologeticas = getByCategory('apologetica').slice(0, 1);
    const selected = [...certas, ...vfs, ...apologeticas];
    // fill up to 5 if needed
    if (selected.length < 5) {
      const extras = shuffleArray(currentDoctrine.perguntas.filter(q => !selected.includes(q)));
      selected.push(...extras.slice(0, 5 - selected.length));
    }
    return shuffleArray(selected);
  }

  if (block === 'block2') {
    const certas = getByCategory('certa').slice(0, 3);
    const incorretas = getByCategory('incorreta').slice(0, 2);
    const selected = [...certas, ...incorretas];
    if (selected.length < 5) {
      const extras = shuffleArray(currentDoctrine.perguntas.filter(q => !selected.includes(q)));
      selected.push(...extras.slice(0, 5 - selected.length));
    }
    return shuffleArray(selected);
  }

  // provao: 10 questions from current + past
  const pastDoctrines = DOCTRINES.filter((d) =>
    completedDoctrines.includes(d.id)
  );
  const pool = shuffleArray([
    ...currentDoctrine.perguntas,
    ...pastDoctrines.flatMap((d) => d.perguntas),
  ]);
  return pool.slice(0, 10);
}
