var highlightColumnsExceedingWipLimit = () => {
    $('.gl-wip-limit-exceeded').removeClass('gl-wip-limit-exceeded');

    $('kt-wip-counter.kt-limit-exceeded').each(function() {
        let stages = [];
        stages.push(this.props.workflowStageId);
        const subStageIds = this.kt._monitoredStageIDs;
        if (subStageIds) {
            stages = stages.concat(subStageIds);
        }

        let selector = "";
        _.each(stages, function(item) {
            selector = `td[data-stage-id="${item}"],${selector}`
        });

        const fixed = selector.slice(0, -1);
        $(fixed).addClass("gl-wip-limit-exceeded");
    });
}


KT.tasks.on('change:workflow_stage_id change:swimlane_id', _.debounce(highlightColumnsExceedingWipLimit, 750));
KT.onInit( function(){ setTimeout(highlightColumnsExceedingWipLimit, 1e3); });
