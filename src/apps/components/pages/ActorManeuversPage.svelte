<script>
    import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
    import { getContext } from "svelte";

    import updateDocumentDataFromField from "../../utils/updateDocumentDataFromField";

    import ItemCategory from "../ItemCategory.svelte";
    import TabFooter from "../TabFooter.svelte";
    import SortFilter from "../SortFilter.svelte";

    const actor = getContext("actor");
    const { maneuvers } = actor;

    $: exertion = $actor.system.attributes.exertion;
    $: sheetIsLocked = !$actor.isOwner
        ? true
        : $actor.flags?.a5e?.sheetIsLocked ?? true;
</script>

<div class="maneuvers-page">
    {#if $actor.isOwner}
        <SortFilter itemType="maneuvers" />
    {/if}

    <section class="maneuvers-main-container">
        {#each Object.entries($maneuvers._degrees) as [label, items]}
            {#if items.length}
                <ItemCategory {label} {items} type="maneuverDegrees" />
            {/if}
        {/each}
    </section>

    <TabFooter>
        {#if $actor.type === "character"}
            <div class="u-flex u-align-center u-gap-md">
                <h3 class="u-mb-0 u-text-sm u-text-bold">
                    {localize("A5E.ExertionPool")}
                </h3>

                <input
                    class="a5e-footer-group__input"
                    class:disable-pointer-events={!$actor.isOwner}
                    type="number"
                    name="system.attributes.exertion.current"
                    value={exertion.current}
                    placeholder="0"
                    min="0"
                    on:change={({ target }) =>
                        updateDocumentDataFromField(
                            $actor,
                            target.name,
                            Number(target.value)
                        )}
                />
                /
                <input
                    class="a5e-footer-group__input"
                    type="number"
                    name="system.attributes.exertion.max"
                    value={exertion.max}
                    placeholder="0"
                    min="0"
                    on:change={({ target }) =>
                        updateDocumentDataFromField(
                            $actor,
                            target.name,
                            Number(target.value)
                        )}
                />
            </div>
        {/if}

        {#if !sheetIsLocked}
            <div class="u-flex u-align-center u-gap-md u-mr-lg u-ml-auto">
                <h3 class="u-mb-0 u-text-sm u-text-bold">
                    {localize("A5E.ConfigureManeuvers")}
                </h3>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <i
                    class="fas fa-gear a5e-config-button"
                    on:click={() => $actor.configureManeuvers()}
                />
            </div>
        {/if}
    </TabFooter>
</div>

<style lang="scss">
    .disable-pointer-events {
        pointer-events: none;
    }

    .maneuvers-page {
        display: flex;
        flex-direction: column;
        flex: 1;
        gap: 0.5rem;
        overflow: hidden;
    }
    .maneuvers-main-container {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        gap: 0.75rem;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
