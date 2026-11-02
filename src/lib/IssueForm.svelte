<script>
    function createIssue(event) {
        event.preventDefault();

        const form = event.currentTarget;
        const data = new FormData(form);

        onCreate(Object.fromEntries(data));
    }

    let { onCreate } = $props();
</script>

<form onsubmit={createIssue}>
    <label for="title">Title</label>
 <input id="title" name="title" type="text" required />

    <label for="description">Description</label> 
<textarea id="description" name="description"></textarea>

    <label for="dueDate">Due Date</label>
   <input id="dueDate" name="dueDate" type="date" required />

    <label for="storyPoints">Story Points</label>
   <input id="storyPoints" name="storyPoints" type="number" min="0" required />

    <label for="priority">Priority</label>
 <select id="priority" name="priority">
    <option value="Low">Low</option>
    <option value="Medium">Medium</option>
    <option value="High">High</option>
</select>

    <button type="submit">Create Issue</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    input, textarea, select {
        padding: 8px;
    }
</style>
