
<script>
    // Importiert das globale CSS für das Layout der Seiten.
    import './layout.css';

    // Nimmt den Seiteninhalt als `children` entgegen.
    let { children } = $props();
</script>

<!-- Rendert den Inhalt der aktuellen Route innerhalb dieses Layouts. -->
{@render children()}
