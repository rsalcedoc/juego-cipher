// --- CONFIGURACIÓN GLOBAL ---
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#0a0a0b',
    scene: {
        preload: preload,
        create: create
    }
};

// Datos de los niveles (Aquí puedes expandir a 100)
// --- BASE DE DATOS DE 100 NIVELES ---
const DATABASE_NIVELES = [
    // 1-25: MODO PRINCIPIANTE (Acertijos clásicos)
    { q: "¿Qué tiene llaves pero no abre cerraduras?", a: "PIANO", hint: "Es un instrumento." },
    { q: "1, 1, 2, 3, 5, 8... ¿Cuál sigue?", a: "13", hint: "Sucesión de Fibonacci." },
    { q: "Si me nombras, desaparezco. ¿Quién soy?", a: "SILENCIO", hint: "Shhh..." },
    { q: "Tengo ciudades, pero no casas. Montañas, pero no árboles.", a: "MAPA", hint: "Representación geográfica." },
    { q: "U, D, T, C, Q, S... ¿Siguiente letra?", a: "S", hint: "Uno, Dos, Tres, Cuatro, Cinco, Seis..." },
    { q: "¿Qué mes tiene 28 días?", a: "TODOS", hint: "Piensa fuera de la caja." },
    { q: "Blanco por dentro, verde por fuera. Si quieres que te diga, espera.", a: "PERA", hint: "Está en la pregunta." },
    { q: "Oro parece, plata no es. Quien no lo adivine, tonto es.", a: "PLATANO", hint: "Fruta amarilla." },
    { q: "Cuanto más le quitas, más grande se hace. ¿Qué es?", a: "AGUJERO", hint: "O un hoyo." },
    { q: "¿Qué se rompe al decir su nombre?", a: "SILENCIO", hint: "Casi lo mismo que el anterior." },
    { q: "Vuelo sin alas, lloro sin ojos. ¿Qué soy?", a: "NUBE", hint: "Está en el cielo." },
    { q: "¿Qué es lo que más pesa en el mundo?", a: "BALANZA", hint: "Cuestión de concepto." },
    { q: "Si me tiras por un balcón no me rompo, pero si me tiras al agua sí.", a: "PAPEL", hint: "Se deshace." },
    { q: "Te sigo a todos lados pero no me puedes tocar.", a: "SOMBRA", hint: "Necesitas luz." },
    { q: "Entra duro y seco, sale blando y pegajoso.", a: "CHICLE", hint: "Goma de mascar." },
    { q: "Soy alto cuando joven y bajo cuando viejo.", a: "VELA", hint: "Ilumina." },
    { q: "Lleno estoy de agujeros, pero aun así retengo el agua.", a: "ESPONJA", hint: "Para lavar platos." },
    { q: "¿Qué puedes sostener con la mano derecha pero nunca con la izquierda?", a: "CODO IZQUIERDO", hint: "Anatomía básica." },
    { q: "Siempre llega pero nunca está aquí hoy.", a: "MAÑANA", hint: "Tiempo futuro." },
    { q: "Tiene ojos pero no ve.", a: "AGUJA", hint: "Para coser." },
    { q: "¿Qué va por el agua y no se moja?", a: "SOMBRA", hint: "Reflejo." },
    { q: "Cae de un edificio y no se mata, cae al agua y se muere.", a: "PAPEL", hint: "Ligero." },
    { q: "Dos hermanos que viven juntos pero no se ven.", a: "OJOS", hint: "En tu cara." },
    { q: "Sube y baja pero siempre está en el mismo lugar.", a: "ESCALERA", hint: "Mueble o estructura." },
    { q: "Tiene cuello pero no cabeza.", a: "BOTELLA", hint: "Recipiente." },

    // 26-50: MODO FÁCIL (Lógica y Secuencias)
    { q: "Si 3 gatos cazan 3 ratones en 3 minutos, ¿cuánto tarda 1 gato en cazar 1 ratón?", a: "3", hint: "No es 1 minuto." },
    { q: "Un padre tiene 54 años y su hijo 30. ¿Hace cuántos años el padre tenía el doble de edad que el hijo?", a: "6", hint: "X = 54 - 2(30-X)." },
    { q: "Palabra de 5 letras que si le quitas 2 te queda 1.", a: "NOVELA", hint: "No-ve-la... la queda." },
    { q: "Soy un número de 3 dígitos. La decena es 5 más que la unidad. La centena es 8 menos que la decena.", a: "194", hint: "Haz las cuentas." },
    { q: "¿Qué letra sigue? E, F, M, A, M, J...", a: "J", hint: "Meses del año." },
    { q: "¿Cuántos animales metió Moisés en el arca?", a: "0", hint: "Fue Noé." },
    { q: "Pobre es quien lo tiene, rico quien lo necesita.", a: "NADA", hint: "Filosofía pura." },
    { q: "Si me tienes, quieres compartirme. Si me compartes, no me tienes.", a: "SECRETO", hint: "Shh." },
    { q: "La palabra 'París' comienza con P y termina con T. ¿Cierto?", a: "CIERTO", hint: "'París' empieza con P, 'Termina' empieza con T." },
    { q: "Un granjero tiene 17 ovejas. Se mueren todas menos 9. ¿Cuántas quedan?", a: "9", hint: "Lee bien." },
    { q: "¿Qué pesa más, un kilo de hierro o un kilo de paja?", a: "IGUAL", hint: "Un kilo es un kilo." },
    { q: "El hijo de mi padre es el padre de mi hijo. ¿Quién soy yo?", a: "YO", hint: "Parentesco." },
    { q: "Tengo tres cítricos: una naranja, un limón y un pomelo. ¿Cómo se llama el cuarto?", a: "COMO", hint: "Lee la pregunta de nuevo." },
    { q: "En una pecera hay 10 peces. 5 se ahogan. ¿Cuántos quedan?", a: "10", hint: "Los peces no se ahogan." },
    { q: "¿Qué tiene 4 ruedas y moscas?", a: "CAMION DE BASURA", hint: "Huele mal." },
    { q: "Un hombre sale bajo la lluvia sin paraguas ni sombrero y no se moja ni un pelo. ¿Por qué?", a: "CALVO", hint: "Anatomía." },
    { q: "¿Qué se puede viajar por todo el mundo permaneciendo en un rincón?", a: "ESTAMPILLA", hint: "Correo postal." },
    { q: "¿Cuántos meses tienen 28 días?", a: "12", hint: "Todos los tienen." },
    { q: "Si me cortas, no lloro, pero tú sí.", a: "CEBOLLA", hint: "Cocina." },
    { q: "Ayer tenía 16 años y el próximo año tendré 19. ¿Qué día es hoy?", a: "1 ENERO", hint: "Cumpleaños el 31 de diciembre." },
    { q: "¿Qué palabra de 7 letras se vuelve más corta si le añades dos?", a: "CORTO", hint: "C-O-R-T-O + D-A." },
    { q: "¿Qué palabra se escribe mal en todos los diccionarios?", a: "MAL", hint: "Literalmente." },
    { q: "¿Cuál es el final de todo?", a: "O", hint: "Letra final." },
    { q: "Si hay 3 manzanas y quitas 2, ¿cuántas tienes?", a: "2", hint: "Las que quitaste." },
    { q: "¿Qué instrumento puedes escuchar pero nunca ver ni tocar?", a: "VOZ", hint: "Canto." },

    // 51-100: MODO INTERMEDIO Y PRO (Criptografía y Patrones Complejos)
    // (Nota: Para ahorrar espacio aquí pongo ejemplos clave, pero el array debe seguir hasta 100)
    { q: "Descifra (ROT13): PELCGB", a: "CRYPTO", hint: "Sustitución simple." },
    { q: "BINARIO: 01010011", a: "S", hint: "ASCII." },
    { q: "En el código Morse, tres puntos significan...", a: "S", hint: "S-O-S." },
    { q: "¿Cuál es el número que sigue? 2, 4, 8, 16, 32...", a: "64", hint: "Potencias de 2." },
    { q: "Código Atbash: 'ZIBZ'", a: "AREA", hint: "A=Z, B=Y..." }
    // ... Continúa hasta el 100 siguiendo este patrón
];

const game = new Phaser.Game({
    ...config,
    scene: [class Boot extends Phaser.Scene {
        constructor() { super('Boot'); }
        create() { this.scene.start('Menu'); }
    }, class Menu extends Phaser.Scene {
        constructor() { super('Menu'); }
        create() {
            this.add.text(400, 200, '>> CIPHER PROTOCOL 2026 <<', { fontSize: '40px', fill: '#00ffcc' }).setOrigin(0.5);
            let btn = this.add.text(400, 400, '[ INICIAR SESIÓN ]', { fontSize: '24px', fill: '#ffffff' })
                .setOrigin(0.5).setInteractive({ useHandCursor: true });
            
            btn.on('pointerdown', () => this.scene.start('Login'));
            // Animación de parpadeo
            this.tweens.add({ targets: btn, alpha: 0.2, duration: 800, yoyo: true, loop: -1 });
        }
    }, class Login extends Phaser.Scene {
        constructor() { super('Login'); }
        create() {
            this.add.text(400, 200, 'AUTENTICACIÓN REQUERIDA', { fill: '#00ffcc' }).setOrigin(0.5);
            this.add.text(400, 300, 'AGENTE: USER_2026', { fontSize: '22px', fill: '#fff' }).setOrigin(0.5);
            
            let enter = this.add.text(400, 450, 'CONFIRMAR ACCESO', { fill: '#00ffcc', backgroundColor: '#111', padding: 10 })
                .setOrigin(0.5).setInteractive({ useHandCursor: true });
            
            enter.on('pointerdown', () => this.scene.start('Play'));
        }
    }, class Play extends Phaser.Scene {
    constructor() { super('Play'); }
    init() {
    // Intentar cargar progreso guardado
    const savedLevel = localStorage.getItem('cipher_progress');
    this.level = savedLevel ? parseInt(savedLevel) : 0;
    this.totalLevels = DATABASE_NIVELES.length;
}

    create() {
        this.drawUI();
    }

    drawUI() {
        this.children.removeAll();
        if (this.level >= this.totalLevels) {
            this.victory();
            return;
        }

        let data = DATABASE_NIVELES[this.level];
        let diff = this.level < 25 ? "PRINCIPIANTE" : this.level < 50 ? "FACIL" : "EXPERTO";

        // UI Header
        this.add.text(20, 20, `SISTEMA ACTIVO | NIVEL: ${this.level + 1}/${this.totalLevels}`, { fill: '#00ffcc', fontSize: '14px' });
        this.add.text(20, 40, `DIFICULTAD: ${diff}`, { fill: '#ff0055', fontSize: '12px' });

        // Pregunta con efecto de escritura
        let questionText = this.add.text(400, 250, "", { 
            fontSize: '24px', fill: '#ffffff', align: 'center', wordWrap: { width: 650 } 
        }).setOrigin(0.5);

        this.typeWrite(questionText, data.q);

        // Botón de Resolver Profesional
        let btn = this.add.rectangle(400, 450, 250, 50, 0x00ffcc, 0.1).setStrokeStyle(2, 0x00ffcc).setInteractive({useHandCursor: true});
        let btnText = this.add.text(400, 450, "[ INGRESAR CLAVE ]", { fill: '#00ffcc', fontSize: '18px' }).setOrigin(0.5);

        btn.on('pointerover', () => { btn.setFillStyle(0x00ffcc, 0.3); });
        btn.on('pointerout', () => { btn.setFillStyle(0x00ffcc, 0.1); });

        btn.on('pointerdown', () => {
            let userAns = prompt(`NIVEL ${this.level + 1}: Introduce tu respuesta`).toUpperCase().trim();
            if(userAns === data.a || userAns === data.a.toUpperCase()) {
                this.level++;
                localStorage.setItem('cipher_progress', this.level);
                this.cameras.main.flash(500, 0, 255, 204); // Efecto visual pro
                this.drawUI();
            } else {
                this.cameras.main.shake(200, 0.01); // Efecto de error
            }
        });

        this.add.text(400, 550, `PISTA: ${data.hint}`, { fontSize: '12px', fill: '#444' }).setOrigin(0.5);
    }

    typeWrite(textObj, fullText) {
        let i = 0;
        this.time.addEvent({
            delay: 30,
            callback: () => {
                textObj.text += fullText[i];
                i++;
            },
            repeat: fullText.length - 1
        });
    }

    victory() {
        this.add.text(400, 300, "SISTEMA DESBLOQUEADO\nERES UN MAESTRO DEL CÓDIGO", {
            fontSize: '40px', fill: '#00ffcc', align: 'center'
        }).setOrigin(0.5);
    }
}]
});

function preload() {}
function create() {}