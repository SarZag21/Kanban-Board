<script>
    import IssueCard from './IssueCard.svelte';

    let { title, issues = [] } = $props();
</script>

<div class="lane">
    <h2>{title}</h2>

  
{#each issues as issue (issue.id)}
    <IssueCard
        title={issue.title}
        description={issue.description}
        storyPoints={issue.storyPoints}
        priority={issue.priority}
        creationDate={issue.creationDate}
        dueDate={issue.dueDate}
    />
{/each}

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
