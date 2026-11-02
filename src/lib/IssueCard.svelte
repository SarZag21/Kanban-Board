<script>
    import { format, parseISO, isBefore, startOfDay } from 'date-fns';
    let { title, description, storyPoints, priority, creationDate, dueDate } = $props();
    let overdue = $derived(
    isBefore(parseISO(dueDate), startOfDay(new Date()))
);
</script>

<div class="issue">
    <h3>{title}</h3>
    <p>{description}</p>
    <p>Story Points: {storyPoints}</p>
    <p>Priority: {priority}</p>
    <p>Created: {format(parseISO(creationDate), 'dd.MM.yyyy')}</p>
    <p>Due: {format(parseISO(dueDate), 'dd.MM.yyyy')}</p>
    {#if overdue}
    <p class="warning">⚠ Overdue!</p>
{/if}
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
    .warning {
    color: #c62828;
    font-weight: bold;
}
</style>
