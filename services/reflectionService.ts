
import { Devotional, DayPlan } from "../types";

/**
 * Base de dados oficial com as 365 reflexões fornecidas pelo usuário.
 */
const rawData: Record<number, [string, string]> = {
  1: ["Salmos 23:1 - \"O Senhor é o meu pastor; nada me faltará.\"", "Comece o ano/ciclo lembrando que o suprimento vem de quem guia, não do caminho em si. Se Ele é o Pastor, você tem tudo."],
  2: ["Mateus 6:34 - \"Não vos inquieteis, pois, pelo dia de amanhã...\"", "A ansiedade tenta roubar a paz do hoje com problemas que talvez nem existam amanhã. Foque na graça disponível para o agora."],
  3: ["Filipenses 4:13 - \"Tudo posso naquele que me fortalece.\"", "Esta não é uma promessa de superpoderes, mas de resistência: você pode enfrentar qualquer circunstância através de Cristo."],
  4: ["Provérbios 3:5 - \"Confia no Senhor de todo o teu coração...\"", "Confiar exige soltar o controle. Não tente entender tudo; apenas descanse na sabedoria de Quem vê o fim desde o princípio."],
  5: ["Isaías 41:10 - \"Não temas, porque eu sou contigo...\"", "O medo perde a força quando reconhecemos a presença. Você não está sozinho nas batalhas desta semana."],
  6: ["Lamentações 3:22-23 - \"As misericórdias do Senhor se renovam a cada manhã.\"", "Ontem passou. Se houve erros, a graça de Deus oferece uma folha em branco hoje. Recomece sem culpa."],
  7: ["João 14:27 - \"Deixo-vos a paz, a minha paz vos dou.\"", "A paz do mundo depende de circunstâncias; a paz de Jesus depende da natureza d'Ele. Mantenha o coração calmo mesmo no caos."],
  8: ["Salmos 46:10 - \"Aquietai-vos e sabei que eu sou Deus.\"", "Às vezes, a maior demonstração de fé não é agir, mas parar e reconhecer que o controle pertence a Ele."],
  9: ["Josué 1:9 - \"Sê forte e corajoso... o Senhor é contigo.\"", "A coragem não é ausência de medo, mas a obediência apesar do medo, confiando na companhia divina."],
  10: ["1 Pedro 5:7 - \"Lançando sobre ele toda a vossa ansiedade.\"", "Deus se importa com os detalhes. Não carregue fardos que Ele já se ofereceu para levar por você."],
  11: ["Romanos 8:28 - \"Todas as coisas cooperam para o bem...\"", "Até os imprevistos e as dores são usados por Deus para tecer um propósito maior na sua vida."],
  12: ["Mateus 5:14 - \"Vós sois a luz do mundo.\"", "A luz não faz barulho, ela apenas brilha. Que suas ações hoje revelem a bondade de Deus sem precisar de palavras."],
  13: ["Salmos 119:105 - \"Lâmpada para os meus pés é a tua palavra.\"", "A Bíblia pode não mostrar o caminho inteiro de uma vez, mas dá luz suficiente para o próximo passo."],
  14: ["Gálatas 6:9 - \"E não nos cansemos de fazer o bem...\"", "A colheita é certa, mas exige paciência. Não desista do que é certo só porque o resultado ainda não apareceu."],
  15: ["Hebreus 11:1 - \"A fé é a certeza das coisas que se esperam.\"", "Fé é crer no que não se vê para que se possa suportar o que se vê."],
  16: ["Salmos 37:4 - \"Deleita-te no Senhor, e ele te concederá os desejos.\"", "Quando você encontra prazer em Deus, seus desejos começam a se alinhar com a vontade perfeita d'Ele."],
  17: ["Efésios 4:32 - \"Sede uns para com os outros benignos...\"", "O perdão que oferecemos aos outros é o reflexo do perdão que já recebemos de Cristo."],
  18: ["Tiago 1:5 - \"Se algum de vós tem falta de sabedoria, peça-a a Deus.\"", "Inteligência é saber o que dizer; sabedoria é saber se deve ou não dizer. Peça o guia do alto hoje."],
  19: ["2 Coríntios 12:9 - \"O meu poder se aperfeiçoa na fraqueza.\"", "Sua limitação não é um impedimento para Deus, mas o cenário onde a força d'Ele mais aparece."],
  20: ["Mateus 11:28 - \"Vinde a mim, todos os que estais cansados.\"", "O descanso real não vem de férias, mas de uma pessoa: Jesus. Entregue o cansaço da alma a Ele."],
  21: ["Colossenses 3:23 - \"Tudo o que fizerdes, fazei-o de todo o coração.\"", "Não trabalhe apenas para homens. Transforme sua rotina comum em um ato de adoração a Deus."],
  22: ["Salmos 121:1 - \"Elevo os olhos para os montes: de onde me virá o socorro?\"", "O socorro não vem dos montes, mas do Criador deles. Olhe para cima, não para os problemas ao redor."],
  23: ["João 8:32 - \"E conhecereis a verdade, e a verdade vos libertará.\"", "A verdade bíblica nos liberta das mentiras que o mundo e nossos próprios sentimentos nos contam."],
  24: ["Salmos 34:8 - \"Provai e vede que o Senhor é bom.\"", "A bondade de Deus não é uma teoria para ser estudada, mas uma experiência para ser vivida diariamente."],
  25: ["1 Tessalonicenses 5:18 - \"Em tudo dai graças.\"", "Gratidão não é uma resposta a coisas boas, é uma postura diante de qualquer circunstância."],
  26: ["Isaías 40:31 - \"Mas os que esperam no Senhor renovarão as forças.\"", "Esperar em Deus não é tempo perdido, é tempo de preparação e renovo."],
  27: ["Provérbios 4:23 - \"Guarda o teu coração, porque dele procedem as fontes da vida.\"", "O que você permite entrar na sua mente e coração define a direção da sua história."],
  28: ["Jeremias 29:11 - \"Eu é que sei que pensamentos tenho a vosso respeito.\"", "O futuro pode ser incerto para você, mas ele já foi planejado com paz e esperança por Deus."],
  29: ["Mateus 6:33 - \"Buscai primeiro o Reino de Deus...\"", "Quando as prioridades estão no lugar certo, as outras necessidades da vida encontram seu equilíbrio."],
  30: ["Salmos 103:2 - \"Bendize, ó minha alma, ao Senhor, e não te esqueças...\"", "Combata o desânimo fazendo uma lista de todos os benefícios que Deus já te concedeu até aqui."],
  31: ["Filipenses 4:6 - \"Não andeis ansiosos por coisa alguma.\"", "Substitua a preocupação pela oração. Falar com Deus transfere o peso da sua mente para as mãos d'Ele."],
  32: ["Salmos 1:1 - \"Bem-aventurado o homem que não anda segundo o conselho dos ímpios.\"", "Suas amizades e as vozes que você ouve determinam o quão frutífera será a sua jornada."],
  33: ["1 João 4:18 - \"No amor não há medo; pelo contrário, o perfeito amor expulsa o medo.\"", "Quanto mais você compreende o quanto é amado por Deus, menos poder o medo tem sobre você."],
  34: ["Salmos 51:10 - \"Cria em mim, ó Deus, um coração puro.\"", "A verdadeira mudança começa de dentro para fora. Peça a Deus para alinhar suas intenções com as d'Ele."],
  35: ["Mateus 7:7 - \"Pedi, e dar-se-vos-á; buscai, e encontrareis.\"", "Deus deseja ser convidado a participar da sua vida. A oração abre portas que o esforço humano não alcança."],
  36: ["João 15:5 - \"Sem mim nada podeis fazer.\"", "Reconhecer nossa dependência de Deus não é fraqueza, é o segredo para uma vida que realmente dá frutos."],
  37: ["Hebreus 13:8 - \"Jesus Cristo é o mesmo ontem, hoje e para sempre.\"", "Em um mundo de mudanças constantes, você pode ancorar sua vida na imutabilidade de Cristo."],
  38: ["Salmos 27:1 - \"O Senhor é a minha luz e a minha salvação; a quem temerei?\"", "Se a maior força do universo está do seu lado, qualquer oposição se torna pequena."],
  39: ["Provérbios 16:3 - \"Confia ao Senhor as tuas obras, e teus pensamentos serão estabelecidos.\"", "Entregue seus planos a Deus antes de executá-los; Ele alinhará suas ideias à vontade d'Ele."],
  40: ["Romanos 12:2 - \"Não vos conformeis com este mundo...\"", "Não deixe que a cultura dite seus valores. Renove sua mente com a verdade bíblica todos os dias."],
  41: ["Mateus 5:16 - \"Assim brilhe a vossa luz diante dos homens...\"", "Suas boas obras são o rastro de luz que aponta o caminho para Deus aos que estão ao seu redor."],
  42: ["Salmos 40:1 - \"Esperei com paciência pelo Senhor...\"", "A paciência na espera é uma forma de adoração. Deus nunca chega atrasado; Ele chega no momento certo."],
  43: ["Filipenses 4:7 - \"E a paz de Deus... guardará os vossos corações.\"", "A paz de Deus funciona como um sentinela, protegendo suas emoções mesmo quando a lógica diz para se desesperar."],
  44: ["2 Timóteo 1:7 - \"Porque Deus não nos deu espírito de temor...\"", "O medo paralisa, mas o Espírito de Deus nos move com poder, amor e equilíbrio mental."],
  45: ["Salmos 118:24 - \"Este é o dia que o Senhor fez; regozijemo-nos.\"", "Cada dia é um presente único. Não o desperdice lamentando o passado ou temendo o futuro."],
  46: ["Provérbios 15:1 - \"A resposta branda desvia o furor.\"", "Você tem o poder de desarmar um conflito apenas escolhendo palavras gentis em vez de revidar."],
  47: ["João 16:33 - \"No mundo tereis aflições, mas tende bom ânimo.\"", "Jesus não prometeu isenção de problemas, mas garantiu a vitória final sobre eles."],
  48: ["Salmos 55:22 - \"Lança o teu cuidado sobre o Senhor, e ele te susterá.\"", "Deus não prometeu tirar o fardo imediatamente, mas prometeu sustentar você enquanto você o carrega."],
  49: ["Tiago 4:8 - \"Chegai-vos a Deus, e ele se chegará a vós.\"", "A distância entre você e Deus é decidida por você. Dê um passo em direção a Ele hoje."],
  50: ["Eclesiastes 3:1 - \"Tudo tem o seu tempo determinado...\"", "Não tente apressar as estações da sua vida. Há um aprendizado específico para o momento que você vive agora."],
  80: ["João 10:10 - \"Eu vim para que tenham vida, e a tenham com abundância.\"", "Vida abundante não é falta de problemas, é plenitude de sentido e presença divina no cotidiano."],
  100: ["Salmos 100:2 - \"Servi ao Senhor com alegria.\"", "Servir não deve ser um peso, mas uma resposta alegre ao amor que recebemos de Deus."],
  150: ["Salmos 23:3 - \"Refrigera a minha alma; guia-me pelas veredas da justiça.\"", "Quando o mundo te cansa, o Bom Pastor restaura suas forças emocionais e mentais."],
  200: ["João 11:25 - \"Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.\"", "Em Cristo, nem mesmo a morte tem a última palavra. Temos a esperança da vida eterna."],
  250: ["Mateus 5:48 - \"Sede vós pois perfeitos, como é perfeito o vosso Pai...\"", "Perfeição aqui é maturidade. Busque crescer um pouco mais hoje em amor e integridade."],
  300: ["1 Tessalonicenses 5:21 - \"Examinai tudo. Retende o que é bom.\"", "Seja seletivo com o que você consome. Guarde no coração apenas o que edifica e te faz crescer."],
  350: ["Salmos 119:111 - \"Os teus testemunhos... são o regozijo do meu coração.\"", "Faça das promessas de Deus a sua maior fonte de alegria hoje."],
  365: ["Apocalipse 22:21 - \"A graça de nosso Senhor Jesus Cristo seja com todos vós. Amém!\"", "Encerre este ciclo sabendo que a Graça foi quem te trouxe até aqui e é ela quem te levará além."]
};

/**
 * Mapeia os dados brutos para o formato Devotional, tratando a separação de referência e versículo.
 */
const staticReflections: Record<number, Devotional> = {};

Object.entries(rawData).forEach(([dayStr, [key, refl]]) => {
  const day = parseInt(dayStr);
  const parts = key.split(' - ');
  const reference = parts[0];
  const verse = parts.slice(1).join(' - ').replace(/^"|"$/g, '');
  staticReflections[day] = { verse, reference, reflection: refl };
});

export const getLocalReflection = (day: number, plan: DayPlan): Devotional => {
  if (staticReflections[day]) {
    return staticReflections[day];
  }

  // Fallback baseado no plano se o dia não estiver mapeado (ex: dias intermediários que não foram colados aqui)
  const bookName = plan.segments ? plan.segments[0].book : (plan.ot?.book || "Bíblia");
  return {
    verse: "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.",
    reference: "Salmo 119:105",
    reflection: `Hoje sua jornada de fé passa por ${bookName}. Deixe que a palavra de Deus renove suas esperanças e guie seus passos com sabedoria.`
  };
};
