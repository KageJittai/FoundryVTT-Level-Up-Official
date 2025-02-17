<script>
    import { getContext } from "svelte";
    import { localize } from "@typhonjs-fvtt/runtime/svelte/helper";
    import { TJSDocument } from "@typhonjs-fvtt/runtime/svelte/store";

    import FormSection from "../components/FormSection.svelte";
    import RadioGroup from "../components/RadioGroup.svelte";

    import constructD20RollFormula from "../../dice/constructD20RollFormula";
    import getExpertiseDieSize from "../../utils/getExpertiseDieSize";
    import prepareExpertiseDiceOptions from "../dataPreparationHelpers/prepareExpertiseDiceOptions";

    export let { actorDocument, abilityKey, dialog, options } =
        getContext("#external").application;

    const rollModeOptions = Object.entries(CONFIG.A5E.rollModes).map(
        ([key, value]) => [
            CONFIG.A5E.ROLL_MODE[key.toUpperCase()],
            localize(value),
        ]
    );

    const actor = new TJSDocument(actorDocument);
    const appId = dialog.id;

    const localizedAbility = localize(CONFIG.A5E.abilities[abilityKey]);
    const buttonText = localize("A5E.RollPromptAbilityCheck", {
        ability: localizedAbility,
    });

    function onSubmit() {
        dialog.submit({ rollFormula });
    }

    let expertiseDie =
        options.expertiseDice ??
        $actor.system.abilities[abilityKey]?.check.expertiseDice;

    let rollMode = options.rollMode ?? CONFIG.A5E.ROLL_MODE.NORMAL;
    let rollFormula;
    let situationalMods = options.situationalMods ?? "";

    $: rollFormula = constructD20RollFormula({
        actor: $actor,
        rollMode,
        modifiers: [
            {
                label: localize("A5E.AbilityCheckMod", {
                    ability: localizedAbility,
                }),
                value: $actor.system.abilities[abilityKey].check.mod,
            },
            {
                label: localize("A5E.AbilityCheckBonus", {
                    ability: localizedAbility,
                }),
                value: $actor.system.abilities[abilityKey].check.bonus,
            },
            {
                label: localize("A5E.AbilityCheckBonusGlobal"),
                value: $actor.system.bonuses.abilities.check,
            },
            {
                label: localize("A5E.ExpertiseDie"),
                value: getExpertiseDieSize(expertiseDie),
            },
            {
                value: situationalMods,
            },
        ],
    }).rollFormula;
</script>

<form>
    <section class="a5e-box u-flex u-flex-wrap u-gap-sm u-p-md u-pos-relative">
        <h3 class="heading">
            {localize("A5E.RollModeHeading")}
        </h3>

        <RadioGroup
            options={rollModeOptions}
            selected={rollMode}
            on:updateSelection={({ detail }) => (rollMode = detail)}
        />
    </section>

    <FormSection heading="A5E.ExpertiseDie">
        <RadioGroup
            options={prepareExpertiseDiceOptions()}
            selected={expertiseDie}
            optionStyles="min-width:2rem; text-align: center;"
            on:updateSelection={({ detail }) => (expertiseDie = detail)}
        />
    </FormSection>

    <section class="a5e-box u-flex u-flex-wrap u-gap-sm u-p-md u-pos-relative">
        <label class="heading" for="{$actor.id}-{appId}-situational-mods">
            {localize("A5E.SituationalMods")}
        </label>

        <input
            class="a5e-input"
            type="text"
            id="{$actor.id}-{appId}-situational-mod"
            bind:value={situationalMods}
        />
    </section>

    <section class="roll-formula-preview">
        {rollFormula}
    </section>

    <section>
        <button on:click|preventDefault={onSubmit}>{buttonText}</button>
    </section>
</form>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 0.75rem;
    }

    .heading {
        display: block;
        font-weight: bold;
        font-size: 0.833rem;
    }

    .roll-formula-preview {
        padding: 0.5rem;
        font-size: 0.833rem;
        border: 1px solid #7a7971;
        border-radius: 4px;
    }
</style>
