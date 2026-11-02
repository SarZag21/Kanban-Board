<script>
    import Lane from '../lib/Lane.svelte';
    
let dialog;

function openDialog() {
    dialog.showModal();
}

let issues = $state([]);

function addIssue(data) {
    issues.push({
        ...data,
        id: crypto.randomUUID(),
        creationDate: new Date().toISOString().slice(0, 10),
        storyPoints: Number(data.storyPoints),
        lane: 'Do'
    });

    dialog.close();
    console.log($state.snapshot(issues));
}
import IssueForm from '../lib/IssueForm.svelte';

</script>

<h1>Kanban Board</h1>


<button onclick={openDialog}>+ New Issue</button>


<div class="board">
  
<Lane title="Do" issues={issues.filter(i => i.lane === 'Do')} />
<Lane title="Doing" issues={issues.filter(i => i.lane === 'Doing')} />
<Lane title="Done" issues={issues.filter(i => i.lane === 'Done')} />
<Lane title="Archiv" issues={issues.filter(i => i.lane === 'Archiv')} />

</div>


<dialog bind:this={dialog}>
    <h2>New Issue</h2>
    <IssueForm onCreate={addIssue} />

    <button onclick={() => dialog.close()}>Close</button>
</dialog>


<style>

h1 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
}
    .board {
        display: flex;
        gap: 20px;
    }

    dialog {
    position: fixed;
    margin: auto;
    padding: 25px;
    border: none;
    border-radius: 10px;
    width: 350px;
    max-width: 90%;
}

dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
}
</style>




