'use strict'

/**
 * Clamp between two numbers
 *
 * @param      {number}  min     The minimum
 * @param      {number}  max     The maximum
 * @param      {number}  val     The value to clamp
 */
function clamp(min, max, val) {
  return Math.min(max, Math.max(min, val));
}

/**
 * Simple helper to return the capitalized version of the
 * current select cluster (i.e., Owens and Pitzer).
 */
function current_cluster_capitalized(){
  var cluster = $('#batch_connect_session_context_cluster').val();
  return capitalize_words(cluster);
}

/**
 * Capitalize the words in a string and remove and '-'.  In the simplest case
 * it simple capitalizes.  It assumes 'words' are hyphenated.
 *
 * @param      {string}  str     The word string to capitalize
 *
 * @example  given 'foo' this returns 'Foo'
 * @example  given 'foo-bar' this returns 'FooBar'
 */
function capitalize_words(str) {
  var camel_case = "";
  var capitalize = true;

  str.split('').forEach((c) => {
    if (capitalize) {
      camel_case += c.toUpperCase();
      capitalize = false;
    } else if(c == '-') {
      capitalize = true;
    } else {
      camel_case += c;
    }
  });

  return camel_case;
}

/**
 * Toggle the visibility of a form group
 *
 * @param      {string}    form_id  The form identifier
 * @param      {boolean}   show     Whether to show or hide
 */
function toggle_visibility_of_form_group(form_id, show) {
  let form_element = $(form_id);
  let parent = form_element.parent();

  // kick out if you didn't find what you're looking for
  if(parent.size() <= 0) {
    return;
  }

  if(show) {
    parent.show();
  } else {
    form_element.val('');
    parent.hide();
  }
}

/**
 * Hide or show options of an element based on which cluster is
 * currently selected and the data-option-for-CLUSTER attributes
 * for each option
 *
 * @param      {string}  element  The element with options to toggle
 */
function toggle_options(element) {
  element.getElementsByTagName("option").each(function(_i, option) {
    let option_element = $(search + "[value='" + option.value + "']");

    if(show) {
      option_element.show();
    } else {
      option_element.hide();

      if(option_element.prop('selected')) {
        option_element.prop('selected', false);

        // when de-selecting something, the default is to fallback to the very first
        // option. But there's an edge case where you want to hide the very first option,
        // and deselecting it does nothing.
        if(option_element.next()){
          option_element.next().prop('selected', true);
        }
      }
    }
  });
}

/**
 * Toggle the visibility of the CUDA select when the selected
 * node_type changes
 */
function toggle_cuda_version_visibility(selected_node_type) {
  const cuda_element = $('#batch_connect_session_context_cuda_version');
  const choose_gpu = selected_node_type.includes('gpu');

  toggle_visibility_of_form_group(cuda_element, choose_gpu);
  if(choose_gpu){
    toggle_options(cuda_element);
  }
}

/**
 * Sets the change handler for the node_type select.
 */
function set_node_type_change_handler() {
  let node_type_input = $('#batch_connect_session_context_node_type');
  node_type_input.change((event) => node_type_change_handler(event));
}

/**
 * Update UI when node_type changes
 */
function node_type_change_handler(event) {
  toggle_cuda_version_visibility(event.target.value);
}

/**
 * Main
 */

// Set controls to align with the values of the last session context
toggle_cuda_version_visibility(
  $('#batch_connect_session_context_node_type option:selected').val()
);
// Install event handlers
set_node_type_change_handler();
