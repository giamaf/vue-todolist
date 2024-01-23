console.log('Vue OK', Vue);

const { createApp } = Vue;

const myApp = createApp({
    name: 'To Do List',
    data() {
        return {
            tasks: [
                { id: 1, done: false, text: 'Fare la spesa' },
                { id: 2, done: false, text: 'Lavare i capelli' },
                { id: 3, done: false, text: 'Comprare una marca da bollo' },
                { id: 4, done: false, text: 'Aggiornare il PC' }
            ],

            // ** Variabile importante per leggere i dati inseriti dall'utente
            newTask: '',

            // ** Variabile importante per leggere la ricerca dell'utente
            searchedText: '',
        }
    },

    computed: {
        filteredTasks() {
            const userText = this.searchedText.toLowerCase();
            const newArray = this.tasks.filter(task => task.text.toLowerCase().includes(userText));

            return newArray;
        }
    },

    methods: {

        // # Funzione per cancellare un task. Passiamo un parametro "id" per individuare quale task vuole eliminare l'utente e riassegnamo il task originale
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => id !== task.id)
        },

        // # Funzione per creare un task. Non passo parametri perchè devo solo leggere. In lettura ho già la variabile "newTask"
        addTask() {

            // ** Creo il nuovo oggetto da inserire nell'array originale
            const newTask = {
                // L'id è creato con una stringa data univoca
                id: new Date().toISOString(),
                done: false,
                text: this.newTask
            }

            // ** Se c'è del testo inserisco l'oggetto nell'array
            if (newTask.text) {
                this.tasks.push(newTask);
            }

            // ** Svuoto il campo in pagina
            this.newTask = '';
        },

        // # Funzione per toggolare la barra sul task
        // Possiamo evitare la funzione perchè abbiamo il v-model sulla checkbox
        // toggleIsDone(id) {
        //     this.tasks.forEach(task => {
        //         if (id === task.id) {
        //             task.done = !task.done
        //         }
        //     })
        // },

        // # Funzione per flaggare tutti i tasks
        setAllDone() {
            this.tasks.forEach(task => {
                task.done = true;
            })
        },

        // # Funzione per deflaggare tutti i tasks
        setAllUndone() {
            this.tasks.forEach(task => {
                task.done = false;
            })
        },

        // # Funzione per eliminare tutti i tasks
        eraseAll() {
            this.tasks = [];
        }
    }
})

myApp.mount('#root');