<script>
    import { format, parseISO } from 'date-fns';
    let { title, description, storyPoints, priority, creationDate, dueDate } = $props();
</script>

<div class="issue">
    <h3>{title}</h3>
    <p>{description}</p>
    <p>Story Points: {storyPoints}</p>
    <p>Priority: {priority}</p>
    <p>Created: {format(parseISO(creationDate), 'dd.MM.yyyy')}</p>
    <p>Due: {format(parseISO(dueDate), 'dd.MM.yyyy')}</p>
</div>

<style>
    .issue {
        background: white;
        padding: 15px;
        border-radius: 6px;
    }

   h3 {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    }
</style>
