<script>
    import IssueCard from './IssueCard.svelte';

    let { title } = $props();
</script>

<div class="lane">
    <h2>{title}</h2>

    {#if title === 'Do'}
        <IssueCard
            title="Login erstellen"
            description="Login-Seite programmieren"
            storyPoints={5}
            priority="High"
            creationDate="2026-11-02"
           dueDate="2026-10-20"
        />
    {/if}
</div>

<style>
    .lane {
        background: #eeeeee;
        padding: 20px;
        flex: 1;
        border-radius: 8px;
    }

    h2 {
        margin: 0 0 15px 0;
        font-size: 18px;
        font-weight: bold;
    }
</style>
