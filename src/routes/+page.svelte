<script>
    import Lane from '../lib/Lane.svelte';
</script>

<h1>Kanban Board</h1>

<div class="board">
    <Lane title="Do" />
    <Lane title="Doing" />
    <Lane title="Done" />
    <Lane title="Archiv" />
</div>

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
</style>




