<script>
    import { getContext } from "svelte";
    import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";

    import prepareSelectedTokenActors from "../../../dataPreparationHelpers/prepareSelectedTokenActors";

    export let prompt;

    const { abilities } = CONFIG.A5E;
    const message = getContext("message");

    function getSavingThrowPrompt() {
        if (game.settings.get("a5e", "protectRolls") ?? false) {
            const actorId = $message?.flags?.a5e?.actorId;
            const actor = fromUuidSync(actorId);

            if (actor && actor.permission < 2) {
                return localize("A5E.RollPromptSavingThrow", {
                    ability: localize(abilities[prompt.ability]),
                });
            }
        }

        return localize("A5E.RollPromptSavingThrowWithDC", {
            ability: localize(abilities[prompt.ability]),
            dc: prompt.dc,
        });
    }

    function rollPrompt() {
        const tokenActors = prepareSelectedTokenActors();

        tokenActors.forEach((token) => {
            token.rollSavingThrow(prompt.ability);
        });
    }
</script>

<button on:click={() => rollPrompt()}>
    {getSavingThrowPrompt()}
</button>
