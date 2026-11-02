
<script>
    // Nimmt die Callback-Funktion entgegen, die nach dem Speichern aufgerufen werden soll.
    let { onCreate } = $props();

    // Verarbeitet das Absenden des Formulars und übergibt die Daten an die Parent-Komponente.
    function createIssue(event) {
        event.preventDefault();

        // Holt das komplette Formular-Element aus dem Event.
        const form = event.currentTarget;
        // Wandelt alle Formularfelder in ein Objekt mit name/value-Paaren um.
        const data = Object.fromEntries(new FormData(form));

        // Ruft die übergebene Funktion zum Erstellen der Aufgabe auf.
        onCreate(data);
        // Setzt das Formular nach dem Absenden zurück.
        form.reset();
    }
</script>

<form onsubmit={createIssue}>
    <!-- Titel der Aufgabe -->
    <label for="title">Title</label>
    <input id="title" name="title" type="text" required />

    <!-- Beschreibung der Aufgabe -->
    <label for="description">Description</label>
    <textarea id="description" name="description"></textarea>

    <!-- Fälligkeitsdatum -->
    <label for="dueDate">Due Date</label>
    <input id="dueDate" name="dueDate" type="date" required />

    <!-- Aufwand in Story Points -->
    <label for="storyPoints">Story Points</label>
    <input
        id="storyPoints"
        name="storyPoints"
        type="number"
        min="0"
        required
    />

    <!-- Priorität der Aufgabe -->
    <label for="priority">Priority</label>
    <select id="priority" name="priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
    </select>

    <!-- Button zum Absenden des Formulars -->
    <button type="submit">Create Issue</button>
</form>

<style>
    /* Das Formular wird als Spalte mit Abstand zwischen den Feldern dargestellt. */
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    /* Einheitsstil für alle Eingabefelder. */
    input, textarea, select {
        padding: 9px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    /* Button-Stil für die Erstellung. */
    button {
        padding: 11px;
        border: none;
        border-radius: 6px;
        background: #263445;
        color: white;
        cursor: pointer;
        margin-top: 10px;
    }
</style>
