<script>
    import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
    import { getContext } from "svelte";
    import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";

    import FormSection from "../components/FormSection.svelte";

    import updateDocumentDataFromField from "../utils/updateDocumentDataFromField";

    export let { actorDocument, appId } = getContext("#external").application;

    const actor = new TJSDocument(actorDocument);
</script>

<article>
    <FormSection heading="A5E.ManeuverDCBonus">
        <div class="u-w-full">
            <input
                class="a5e-input"
                type="text"
                name="system.bonuses.maneuverDC"
                value={$actor.system.bonuses.maneuverDC}
                on:change={({ target }) =>
                    updateDocumentDataFromField(
                        $actor,
                        target.name,
                        target.value
                    )}
            />
        </div>
    </FormSection>

    {#if $actor.type === "character"}
        <FormSection>
            <div class="u-align-center u-flex u-gap-md">
                <input
                    class="a5e-input"
                    type="checkbox"
                    name="system.attributes.exertion.recoverOnRest"
                    id="{appId}-exertion-recover"
                    checked={$actor.system.attributes.exertion.recoverOnRest}
                    on:change={({ target }) =>
                        updateDocumentDataFromField(
                            $actor,
                            target.name,
                            target.checked
                        )}
                />

                <label class="u-pointer" for="{appId}-exertion-recovery">
                    {localize("A5E.ExertionRecoveryConfigPrompt")}
                </label>
            </div>
        </FormSection>
    {/if}
</article>

<style lang="scss">
    article {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: 0.75rem;
        gap: 0.5rem;
        overflow: auto;
        background: rgba(246, 242, 235, 0.5);
    }
</style>
