<script>
    import { getContext } from "svelte";

    import updateDocumentDataFromField from "../../utils/updateDocumentDataFromField";

    export let icon;
    export let tooltipText;
    export let trackProperty;
    export let value;

    const actor = getContext("actor");
</script>

<div
    class="track track-{trackProperty}"
    data-track={trackProperty}
    data-tooltip={tooltipText}
    data-tooltip-direction="DOWN"
>
    <i class="track-icon fas {icon} track-icon-level-{value}" />

    <ul class="track-items">
        {#each [0, 1, 2, 3, 4, 5, 6, 7] as degree}
            <li>
                <button
                    class="track-item"
                    class:track-item-selected={value === degree}
                    class:disable-pointer-events={!$actor.isOwner}
                    data-degree={degree}
                    on:click={() =>
                        updateDocumentDataFromField(
                            $actor,
                            `system.attributes.${trackProperty}`,
                            degree
                        )}
                >
                    {degree}
                </button>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    $colors: (
        "1": #919f00,
        "2": #a09200,
        "3": #af8300,
        "4": #bd7100,
        "5": #cb5c00,
        "6": #d63f00,
        "7": #e00006,
    );

    .disable-pointer-events {
        pointer-events: none;
    }

    .track {
        position: absolute;
        z-index: 2;
        display: flex;
        overflow: hidden;
        width: 2rem;
        height: 2rem;
        align-items: center;
        border-radius: 50%;

        transition: width 0.3s ease;

        &-fatigue {
            z-index: 3;
            top: 1rem;
            right: 0.625rem;
        }

        &-icon {
            z-index: 1;
            display: flex;
            width: 2rem;
            height: 2rem;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            border: 1px solid #ccc;
            background: #f6f2eb;
            border-radius: 50%;
            box-shadow: 0 0 10px #ccc inset;
            color: rgba(0, 0, 0, 0.2);
            cursor: pointer;
            font-size: 1.2rem;
            transform: translateX(-1px);

            transition: all 0.15s ease-in-out;

            @each $level, $color in $colors {
                &-level-#{$level} {
                    border-color: $color;
                    box-shadow: 0 0 10px $color inset;
                    color: $color;
                }
            }
        }

        &-item {
            display: flex;
            align-items: center;
            height: 100%;
            padding: 0 0.5rem;
            background: transparent;
            border-radius: 0;

            transition: all 0.15s ease-in-out;

            &:focus,
            &:hover {
                background: darken(#dddace, 2.5%);
                box-shadow: none;
            }

            &-selected {
                background: darken(#dddace, 2.5%);
            }
        }

        &-items {
            z-index: 0;
            display: flex;
            height: 2rem;
            padding: 0 0.75rem 0 1.5rem;
            border: 1px solid #ccc;
            border-left: 0;
            margin: 0;
            background: #f6f2eb;
            border-radius: 0 1rem 1rem 0;
            list-style: none;
            opacity: 0;
            transform: translateX(-1rem);

            transition: all 0.15s ease-in-out;
        }

        &-strife {
            top: 39%;
            right: -0.125rem;
        }

        &:hover {
            overflow: initial;

            .track-items {
                opacity: 1;
            }

            .track-icon {
                color: lighten(#191813, 35%);

                @each $level, $color in $colors {
                    &-level-#{$level} {
                        border-color: $color;
                        box-shadow: 0 0 10px $color inset;
                        color: $color;
                    }
                }
            }
        }
    }
</style>
