/*global $, jQuery, _, asm, common, config, controller, dlgfx, format, header, html, tableform, validate */

$(function() {

    "use strict";

    const batch = {

        options: function() { 
            return [
                '<option value="genshelterpos">' + _("Recalculate on-shelter animal locations") + '</option>',
                '<option value="genallpos">' + _("Recalculate ALL animal locations") + '</option>',
                '<option value="genallvariable">' + _("Recalculate ALL animal ages/times") + '</option>',
                '<option value="genallbreeds">' + _("Recalculate ALL animal breed names") + '</option>',
                '<option value="genlitters">' + _("Recalculate active litter counts") + '</option>',
                '<option value="gendiarylinkinfo">' + _("Regenerate diary link info for incomplete notes") + '</option>',
                '<option value="genlookingfor">' + _("Regenerate 'Person looking for' report") + '</option>',
                '<option value="genownername">' + _("Regenerate person names in selected format") + '</option>',
                '<option value="genownerflags">' + _("Regenerate person flags column") + '</option>',
                '<option value="genlostfound">' + _("Regenerate 'Match lost and found animals' report") + '</option>',
                '<option value="genfigyear">' + _("Regenerate annual animal figures for") + '</option>',
                '<option value="genfigmonth">' + _("Regenerate monthly animal figures for") + '</option>',
                '<option value="resetnnncodes">' + _("Reset NNN animal code counts for this year") + '</option>'
            ].join("\n");
        },

        render: function() {
            return [
                html.content_header(_("Trigger Batch Processes")),
                html.warn(_("These batch processes are run each night by the system and should not need to be run manually.") + '<br/><br/><b>' + 
                    _("Some batch processes may take a few minutes to run and could prevent other users being able to use the system for a short time.")
                    + '</b>'),
                tableform.fields_render([
                    { id: "task", type: "select", label: "", doublesize: true, options: batch.options() },
                    { id: "taskdate", type: "date", label: "" }
                ], { full_width: false }),
                tableform.buttons_render([
                   { id: "go", icon: "save", text: _("Go") }
                ], { centered: true }),
                html.content_footer()
            ].join("\n");
        },

        runmode: async function(btn, formdata) {
            await common.ajax_post("batch", formdata);
            common.route("task");
        },

        bind: function() {
            $("#button-go").button().click(function() {
                let task = $("#task").val(), taskdate = $("#taskdate").val();
                batch.runmode( task, "mode=" + task + "&taskdate=" + taskdate );
            });
            $("#taskdaterow").hide();
            $("#task").change(function() {
                let task = $("#task").val();
                $("#taskdaterow").toggle(task == "genfigyear" || task == "genfigmonth");
            });
        },

        name: "batch",
        animation: "options",
        title: function() { return _("Batch"); },
        routes: {
            "batch": function() { common.module_loadandstart("batch", "batch"); }
        }

    };

    common.module_register(batch);

});
