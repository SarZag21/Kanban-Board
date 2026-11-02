
<script>
    // Importiert die Aufgabenkarte, die innerhalb einer Spalte gerendert wird.
    import IssueCard from './IssueCard.svelte';

    // Nimmt Titel, Aufgabenliste und Verschiebe-Callback als Props entgegen.
    let { title, issues = [], onMove } = $props();

    // Berechnet die Gesamt-Story-Points der Spalte automatisch neu.
    let total = $derived(
        issues.reduce((sum, issue) => sum + issue.storyPoints, 0)
    );

    // Verarbeitet das Ablegen einer Aufgabe in die Spalte.
    function dropIssue(event) {
        event.preventDefault();

        // Holt die ID der gezogenen Aufgabe aus dem Drag-and-Drop-Objekt.
        const id = event.dataTransfer.getData('text/plain');

        // Wenn eine ID vorhanden ist, wird die Aufgabe in diese Spalte verschoben.
        if (id) {
            onMove(id, title);
        }
    }
</script>

<div
    class="lane"
    role="region"
    aria-label={title}
    ondragover={(event) => event.preventDefault()}
    ondrop={dropIssue}
>
    <!-- Zeigt den Namen der Spalte an. -->
    <h2>{title}</h2>
    <!-- Zeigt die Summe der Story Points in dieser Spalte an. -->
    <p class="points">Story Points: {total}</p>

    <!-- Rendert für jede Aufgabe eine Karte. -->
    {#each issues as issue (issue.id)}
        <IssueCard {issue} {onMove} />
    {/each}
</div>

<style>
    /* Das Design der Spalte: hellgrauer Hintergrund und feste Größe. */
    .lane {
        background: #eeeeee;
        padding: 18px;
        flex: 1;
        min-width: 210px;
        min-height: 250px;
        border-radius: 10px;
    }

    /* Titel der Spalte. */
    h2 {
        margin: 0;
        font-size: 20px;
    }

    /* Stil für die Gesamtpunktzahl unter dem Titel. */
    .points {
        font-size: 13px;
        color: #666;
    }
</style>
