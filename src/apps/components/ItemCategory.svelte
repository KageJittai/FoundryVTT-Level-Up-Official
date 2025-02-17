<script>
    import { getContext } from "svelte";
    import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";

    import Item from "./Item.svelte";
    import SpellSlots from "./SpellSlots.svelte";

    export let label;
    export let level = 0;
    export let items;
    export let type;

    const actor = getContext("actor");

    const A5E = CONFIG.A5E;
    const itemContext = [...items][0]?.type || "item";

    function createItem() {
        const updateData = {
            name: `New ${itemContext}`,
            type: itemContext,
        };

        if (label !== "" && itemContext !== "item")
            updateData[`system.${itemContext}Type`] = label;

        $actor.createEmbeddedDocuments("Item", [updateData]);
    }

    $: sheetIsLocked = !$actor.isOwner
        ? true
        : $actor.flags?.a5e?.sheetIsLocked ?? true;
    $: showSpellSlots = $actor.flags?.a5e?.showSpellSlots ?? true;
    $: showSpellPoints = $actor.flags?.a5e?.showSpellPoints ?? false;
</script>

<section class="category-container">
    <!-- svelte-ignore missing-declaration -->
    {#if !(type === "featureTypes" && $actor.type === "npc")}
        <span class="category-header">
            <h3>
                {localize(CONFIG.A5E[type][label] || label)}

                {#if type === "spellLevels" && !showSpellSlots && showSpellPoints}
                    {localize("A5E.SpellPointsCost", {
                        cost: A5E.spellLevelCost[level],
                    })}
                {/if}
            </h3>

            {#if type === "spellLevels" && showSpellSlots}
                <SpellSlots {level} />
            {/if}

            {#if !sheetIsLocked}
                <i class="inventory-add-icon a5e-config-button" />
                <button
                    class="a5e-button a5e-button--add inventory-add-icon"
                    on:click={createItem}
                >
                    {localize("A5E.ButtonAdd", {
                        type: localize(A5E.itemTypes[itemContext]),
                    })}
                </button>
            {/if}
        </span>
    {/if}

    <ul class="items-container">
        {#each [...items] as item (item.id)}
            <Item {item} />
        {/each}
    </ul>
</section>

<style lang="scss">
    .category-header {
        display: flex;
        align-items: center;
        margin-bottom: 0.25rem;
        padding-bottom: 0.25rem;
        border-bottom: 1px solid #ccc;
        height: 1.5rem;
        gap: 0.5rem;

        h3 {
            font-size: 0.833rem;
            min-width: 4.5rem;
        }

        .inventory-add-icon {
            padding-inline: 0.25rem;
        }
    }

    .items-container {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 0;
        padding-right: 0.375rem;
        margin: 0;
        margin-right: -0.375rem;
        list-style: none;
        overflow-y: auto;
    }
</style>
