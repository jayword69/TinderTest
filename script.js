const questions = [
    "Me siento cómodo/a en situaciones sociales.",
    "Prefiero planificar con anticipación en lugar de improvisar.",
    "Disfruto de largas conversaciones filosóficas.",
    "Tiendo a seguir mi corazón más que mi cabeza.",
    "Me gusta estar en el centro de atención.",
    "Me considero una persona organizada.",
    "Prefiero la innovación a la tradición.",
    "Las emociones juegan un papel importante en mis decisiones.",
    "Me energiza estar rodeado/a de gente.",
    "Sigo un horario estricto en mi vida diaria.",
    "Me interesa más el futuro que el presente o el pasado.",
    "Tiendo a ponerme en el lugar de los demás.",
    "Inicio conversaciones con facilidad.",
    "Me gusta tener todo bajo control.",
    "Disfruto explorando ideas abstractas.",
    "Valoro la armonía y el consenso en los grupos.",
    "Expreso mis opiniones abiertamente.",
    "Prefiero terminar una tarea antes de empezar otra.",
    "Me considero una persona creativa.",
    "Tiendo a evitar los conflictos.",
    "Disfruto siendo el centro de atención en eventos sociales.",
    "Hago listas para organizar mis tareas.",
    "Me gusta pensar en las posibilidades futuras.",
    "Me preocupo por cómo mis acciones afectan a los demás.",
    "Inicio conversaciones con extraños con facilidad.",
    "Prefiero un enfoque estructurado en el trabajo y el estudio.",
    "Me atraen las ideas novedosas y poco convencionales.",
    "Tiendo a ser diplomático/a y evitar ofender a otros.",
    "Me siento cómodo/a en grandes grupos de personas.",
    "Prefiero la rutina a la variedad.",
    "Me gusta resolver problemas complejos.",
    "Tiendo a ser empático/a con los sentimientos de los demás.",
    "Hablo más de lo que escucho en conversaciones.",
    "Prefiero trabajar con plazos y fechas límite.",
    "Me interesan los patrones y las conexiones entre ideas.",
    "Priorizo la armonía en mis relaciones personales.",
    "Tomo la iniciativa en situaciones sociales.",
    "Me gusta planificar mis vacaciones con anticipación.",
    "Disfruto de debates teóricos.",
    "Considero importante mantener la paz en los grupos.",
    "Me resulta fácil hacer nuevos amigos.",
    "Mantengo mi espacio de trabajo ordenado y organizado.",
    "Prefiero ideas abstractas a ejemplos concretos.",
    "Tiendo a buscar el consenso en las discusiones grupales.",
    "Me siento energizado/a después de asistir a eventos sociales.",
    "Sigo las reglas y regulaciones de cerca.",
    "Me gusta explorar múltiples interpretaciones de una situación.",
    "Valoro la cooperación por encima de la competencia.",
    "Prefiero actividades grupales a individuales.",
    "Me siento incómodo/a con la ambigüedad y la incertidumbre.",
    "Disfruto de conversaciones sobre teorías y conceptos.",
    "Tiendo a ser conciliador/a en situaciones de conflicto.",
    "Me resulta fácil mantener conversaciones con desconocidos.",
    "Prefiero tener un plan detallado antes de comenzar un proyecto.",
    "Me interesan las ideas innovadoras y fuera de lo común.",
    "Considero los sentimientos de los demás al tomar decisiones.",
    "Prefiero ambientes animados y llenos de gente.",
    "Me gusta tener una rutina diaria establecida.",
    "Disfruto resolviendo problemas complejos y abstractos.",
    "Trato de mantener la armonía en mis relaciones personales.",
    "Me siento cómodo/a liderando grupos de personas.",
    "Prefiero seguir métodos probados y verdaderos.",
    "Me atraen las ideas y teorías complejas.",
    "Tiendo a ser sensible a las necesidades de los demás.",
    "Disfruto siendo el alma de la fiesta.",
    "Me gusta tener un lugar para cada cosa y cada cosa en su lugar.",
    "Prefiero discusiones teóricas a conversaciones prácticas.",
    "Evito herir los sentimientos de los demás.",
    "Me siento energizado/a al conocer nuevas personas.",
    "Prefiero seguir un horario estructurado.",
    "Me fascina explorar nuevas ideas y posibilidades.",
    "Tiendo a ser comprensivo/a con las debilidades de los demás.",
    "Tomo la iniciativa para organizar eventos sociales.",
    "Me siento más cómodo/a con lo familiar que con lo desconocido.",
    "Disfruto analizando situaciones desde múltiples perspectivas.",
    "Valoro la empatía y la comprensión en las relaciones.",
    "Prefiero trabajar en equipo que individualmente.",
    "Me gusta tener un plan claro antes de actuar.",
    "Me atraen los problemas que requieren pensamiento abstracto.",
    "Trato de mantener un ambiente armonioso en mi entorno."
];

let currentQuestion = 0;
let answers = [];

const introCard = document.getElementById('intro');
const questionCard = document.getElementById('question');
const resultCard = document.getElementById('result');
const questionText = document.getElementById('questionText');
const progressBar = document.querySelector('.progress-bar');
const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const likertButtons = document.querySelectorAll('.likert button');

startButton.addEventListener('click', startTest);
restartButton.addEventListener('click', restartTest);
likertButtons.forEach(button => button.addEventListener('click', answerQuestion));

function startTest() {
    introCard.classList.add('hidden');
    questionCard.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    questionText.textContent = questions[currentQuestion];
    updateProgressBar();
}

function answerQuestion(event) {
    const answer = parseInt(event.target.value);
    answers.push(answer);
    
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function updateProgressBar() {
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function showResult() {
    questionCard.classList.add('hidden');
    resultCard.classList.remove('hidden');
    const result = calculateMBTI();
    document.getElementById('mbtiResult').textContent = result.type;
    document.getElementById('mbtiDescription').textContent = getMBTIDescription(result.type);
    displayDimensionScores(result.scores);
}

function calculateMBTI() {
    const dimensions = ['EI', 'SN', 'TF', 'JP'];
    const scores = dimensions.map(() => ({ score: 0, total: 0 }));
    const weights = [
        [1, 1.2, 0.8, 1.1, 0.9, 1, 1.1, 0.9, 1.2, 0.8, 1, 1, 0.9, 1.1, 1, 0.8, 1.2, 0.9, 1, 1.1],
        [1, 0.9, 1.1, 1, 1.2, 0.8, 1, 1.1, 0.9, 1, 1, 1.2, 0.8, 1, 1.1, 0.9, 1, 1, 0.9, 1.1],
        [1.2, 1, 0.9, 1.1, 1, 1, 0.8, 1.2, 1, 0.9, 1.1, 1, 1, 0.8, 1.2, 1, 0.9, 1.1, 1, 1],
        [1, 1.1, 1, 0.8, 1.2, 0.9, 1, 1, 1.1, 1, 0.8, 1.2, 0.9, 1, 1, 1.1, 1, 0.8, 1.2, 0.9]
    ];

    answers.forEach((answer, index) => {
        dimensions.forEach((dim, dimIndex) => {
            const weight = weights[dimIndex][index % 20];
            scores[dimIndex].score += answer * weight;
            scores[dimIndex].total += 5 * weight;
        });
    });

    let result = '';
    const finalScores = scores.map(({score, total}, index) => {
        const percentage = (score / total) * 100;
        const letter = percentage > 50 ? dimensions[index][0] : dimensions[index][1];
        result += letter;
        return percentage;
    });

    return {
        type: result,
        scores: finalScores
    };
}

function getMBTIDescription(type) {
    const descriptions = {
        'INTJ': 'Innovador estratégico con una mente analítica y una visión a largo plazo.',
        'INTP': 'Pensador lógico e innovador con un interés en teorías y ideas abstractas.',
        'ENTJ': 'Líder carismático con habilidades para la planificación estratégica y la toma de decisiones.',
        'ENTP': 'Pensador creativo y elocuente que disfruta de debates intelectuales y nuevas ideas.',
        'INFJ': 'Idealista compasivo con una fuerte intuición y deseo de hacer una diferencia en el mundo.',
        'INFP': 'Idealista creativo con fuertes valores personales y un deseo de ayudar a los demás.',
        'ENFJ': 'Líder carismático y empático que inspira y motiva a los demás.',
        'ENFP': 'Entusiasta creativo con excelentes habilidades interpersonales y una mente curiosa.',
        'ISTJ': 'Individuo responsable y práctico con un fuerte sentido del deber y atención al detalle.',
        'ISFJ': 'Protector leal y considerado con un fuerte sentido de responsabilidad hacia los demás.',
        'ESTJ': 'Administrador eficiente con habilidades para organizar personas y procesos.',
        'ESFJ': 'Cuidador sociable y responsable que valora la armonía y la cooperación.',
        'ISTP': 'Artesano pragmático con excelentes habilidades para resolver problemas prácticos.',
        'ISFP': 'Artista sensible y de espíritu libre que valora la autenticidad y la expresión personal.',
        'ESTP': 'Emprendedor enérgico y práctico que disfruta de la acción y los desafíos.',
        'ESFP': 'Animador espontáneo y entusiasta que disfruta de la vida y las interacciones sociales.'
    };
    return descriptions[type] || 'Descripción no disponible.';
}

function displayDimensionScores(scores) {
    const dimensionLabels = ['Extroversión - Introversión', 'Sensorial - Intuitivo', 'Pensamiento - Sentimiento', 'Juicio - Percepción'];
    const dimensionScoresDiv = document.getElementById('dimensionScores');
    dimensionScoresDiv.innerHTML = '';

    scores.forEach((score, index) => {
        const dimensionDiv = document.createElement('div');
        const label = document.createElement('div');
        label.className = 'dimension-label';
        label.innerHTML = `<span>${dimensionLabels[index]}</span><span>${Math.round(score)}%</span>`;
        
        const bar = document.createElement('div');
        bar.className = 'dimension-bar';
        const fill = document.createElement('div');
        fill.className = 'dimension-fill';
        fill.style.width = `${score}%`;
        
        bar.appendChild(fill);
        dimensionDiv.appendChild(label);
        dimensionDiv.appendChild(bar);
        dimensionScoresDiv.appendChild(dimensionDiv);
    });
}

function restartTest() {
    currentQuestion = 0;
    answers = [];
    resultCard.classList.add('hidden');
    introCard.classList.remove('hidden');
    progressBar.style.width = '0%';
}
const downloadButton = document.getElementById('download');

downloadButton.addEventListener('click', function() {
    window.location.href = 'https://drive.google.com/uc?export=download&id=14zC6seL3BW1A6ZDopaWKGwo3cQqWAs3a';
});
