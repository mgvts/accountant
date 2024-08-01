export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('click-outside', {
        mounted(el, binding) {
            console.log(el)
            console.log(binding)
            el.clickOutsideEvent = function (event) {
                console.log(checkEvent(event, el, binding))

                // here I check that click was outside the el and his childrens
                if (!(el == event.target || el.contains(event.target))) {
                    // and if it did, call method provided in attribute value
                    binding.value(event);
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unmounted(el) {
          document.body.removeEventListener('click', el.clickOutsideEvent)
        },
    })
})

function checkEvent (e: MouseEvent, el: HTMLElement, binding): boolean {
    // If we're clicking inside the shadowroot, then the app root doesn't get the same
    // level of introspection as to _what_ we're clicking. We want to check to see if
    // our target is the shadowroot parent container, and if it is, ignore.
    const root = attachedRoot(el)
    if (
        typeof ShadowRoot !== 'undefined' &&
        root instanceof ShadowRoot &&
        root.host === e.target
    ) return false

    // Check if additional elements were passed to be included in check
    // (click must be outside all included elements, if any)
    const elements = ((typeof binding.value === 'object' && binding.value.include) || (() => []))()
    // Add the root element for the component this directive was defined on
    elements.push(el)

    // Check if it's a click outside our elements, and then if our callback returns true.
    // Non-toggleable components should take action in their callback and return falsy.
    // Toggleable can return true if it wants to deactivate.
    // Note that, because we're in the capture phase, this callback will occur before
    // the bubbling click event on any outside elements.
    return !elements.some(el => el?.contains(e.target as Node))
}

export function attachedRoot (node: Node): null | HTMLDocument | ShadowRoot {
    /* istanbul ignore next */
    if (typeof node.getRootNode !== 'function') {
        // Shadow DOM not supported (IE11), lets find the root of this node
        while (node.parentNode) node = node.parentNode

        // The root parent is the document if the node is attached to the DOM
        if (node !== document) return null

        return document
    }

    const root = node.getRootNode()

    // The composed root node is the document if the node is attached to the DOM
    if (root !== document && root.getRootNode({ composed: true }) !== document) return null

    return root as HTMLDocument | ShadowRoot
}