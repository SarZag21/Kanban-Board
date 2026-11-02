
<script>
    // Importiert die Datumsfunktionen, die für Fälligkeit und Anzeige benutzt werden.
    import { format, parseISO, isBefore, startOfDay } from 'date-fns';

    // Nimmt die Aufgabe und die Callback-Funktion für das Verschieben als Props entgegen.
    let { issue, onMove } = $props();

    // Berechnet, ob die Aufgabe überfällig ist und noch nicht erledigt wurde.
    let overdue = $derived(
        issue.lane !== 'Done' &&
        issue.lane !== 'Archiv' &&
        isBefore(parseISO(issue.dueDate), startOfDay(new Date()))
    );

    // Hilfsfunktion zum Erzeugen einer Download-Datei im Browser.
    function download(content, filename, type) {
        // Verpackt den Inhalt in ein Blob mit dem passenden MIME-Typ.
        const blob = new Blob([content], { type });
        // Erstellt eine temporäre URL für den Download.
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = filename;
        a.click();

        // Entfernt die temporäre URL nach dem Download wieder.
        URL.revokeObjectURL(url);
    }

    // Exportiert eine Aufgabe als iCalendar-Datei (.ics).
    function exportICS() {
        // Das Fälligkeitsdatum braucht im ICS-Format keine Bindestriche.
        const date = issue.dueDate.replaceAll('-', '');
        // Bereinigt Texte, damit Sonderzeichen im Kalender-Format korrekt behandelt werden.
        const clean = (text) => String(text || '')
            .replaceAll('\\', '\\\\')
            .replaceAll('\n', '\\n')
            .replaceAll(',', '\\,')
            .replaceAll(';', '\\;');

        // Baut den ICS-Inhalt zeilenweise zusammen.
        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Kanban Board//EN',
            'BEGIN:VEVENT',
            `UID:${issue.id}@kanban.local`,
            `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
            `DTSTART;VALUE=DATE:${date}`,
            `SUMMARY:${clean(issue.title)}`,
            `DESCRIPTION:${clean(issue.description)}`,
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        // Startet den Download der ICS-Datei.
        download(ics, 'issue.ics', 'text/calendar;charset=utf-8');
    }

    // Teilt eine Aufgabe per Web Share API mit anderen Apps.
    async function shareIssue() {
        // Erstellt den Text, der in der Share-Nachricht enthalten sein soll.
        const text = `${issue.title}\n${issue.description}\nDue: ${issue.dueDate}`;

        // Nutzt die native Share-Funktion, wenn der Browser sie unterstützt.
        if (navigator.share) {
            try {
                await navigator.share({ title: issue.title, text });
            } catch (error) {
                // Abbruch durch den Benutzer soll nicht als Fehler behandelt werden.
                if (error.name !== 'AbortError') console.error(error);
            }
        } else {
            // Fallback, falls die Share-Funktion im Browser fehlt.
            alert('Sharing is not supported in this browser.');
        }
    }
</script>

<div
    class="issue"
    role="group"
    draggable="true"
    ondragstart={(event) => {
        // Speichert die Aufgaben-ID im Drag-and-Drop-Objekt, damit sie später wieder erkannt wird.
        event.dataTransfer.setData('text/plain', issue.id);
        // Gibt an, dass die Aufgabe verschoben werden soll.
        event.dataTransfer.effectAllowed = 'move';
    }}
>
    <!-- Titel der Aufgabe -->
    <h3>{issue.title}</h3>
    <!-- Beschreibung der Aufgabe -->
    <p>{issue.description}</p>

    <!-- Informationen zur Aufgabe -->
    <p>Story Points: {issue.storyPoints}</p>
    <p>Priority: {issue.priority}</p>
    <p>Created: {format(parseISO(issue.creationDate), 'dd.MM.yyyy')}</p>
    <p>Due: {format(parseISO(issue.dueDate), 'dd.MM.yyyy')}</p>

    <!-- Zeigt eine Warnung an, wenn das Fälligkeitsdatum in der Vergangenheit liegt. -->
    {#if overdue}
        <p class="warning">⚠ Overdue!</p>
    {/if}

    <div class="actions">
        <!-- Exportiert die Aufgabe als ICS-Datei. -->
        <button onclick={exportICS}>ICS</button>
        <!-- Startet das Teilen der Aufgabe. -->
        <button onclick={shareIssue}>Share</button>
    </div>

    <select
        aria-label="Move issue to lane"
        value={issue.lane}
        onchange={(event) => onMove(issue.id, event.currentTarget.value)}
    >
        <!-- Listet alle möglichen Zielspalten auf. -->
        {#each ['Do', 'Doing', 'Done', 'Archiv'] as lane}
            <option value={lane}>{lane}</option>
        {/each}
    </select>
</div>

<style>
    /* Kartendesign der einzelnen Aufgabe. */
    .issue {
        background: white;
        padding: 16px;
        border-radius: 8px;
        margin-top: 12px;
        border: 1px solid #dedede;
        cursor: grab;
        overflow-wrap: anywhere;
    }

    /* Überschrift der Karte. */
    h3 {
        margin: 0 0 10px;
        font-size: 18px;
    }

    /* Textabsätze in der Karte. */
    p {
        margin: 5px 0;
        font-size: 14px;
    }

    /* Warnungsfarbe für überfällige Aufgaben. */
    .warning {
        color: #c62828;
        font-weight: bold;
    }

    /* Container für die Aktionsbuttons. */
    .actions {
        display: flex;
        gap: 8px;
        margin-top: 12px;
    }

    /* Stil für Buttons und Select-Felder innerhalb der Karte. */
    button, select {
        padding: 7px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #f7f7f7;
        cursor: pointer;
    }

    /* Auswahlmenü nimmt die volle Breite ein. */
    select {
        margin-top: 10px;
        width: 100%;
    }
</style>
