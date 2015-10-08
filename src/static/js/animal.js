/*jslint browser: true, forin: true, eqeq: true, white: true, sloppy: true, vars: true, nomen: true */
/*global $, _, asm, common, config, controller, dlgfx, additional, edit_header, format, header, html, social, tableform, validate */

$(function() {

    var animal = {

        render_death: function() {
            return [
                '<h3><a href="#">' + _("Death") + ' <img id="tabdeath" style="display: none" class="asm-icon asm-icon-death"></span></a></h3><div>',
                '<table class="additionaltarget" data="to6">',
                '<tr>',
                '<td>',
                '<label for="deceaseddate">' + _("Deceased Date") + '</label>',
                '</td>',
                '<td>',
                '<input class="asm-textbox asm-datebox" id="deceaseddate" data-json="DECEASEDDATE" data-post="deceaseddate" title="' + html.title(_("The date the animal died")) + '" />',
                '</td>',
                '</tr>',
                '<tr>',
                '<td>',
                '<label for="deathcategory">' + _("Category") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="deathcategory" data-json="PTSREASONID" data-post="deathcategory">',
                html.list_to_options(controller.deathreasons, "ID", "REASONNAME"),
                '</select>',
                '</td>',
                '</tr>',
                '<tr>',
                '<td colspan="2">',
                '<label for="puttosleep">' + _("Euthanized") + '</label>',
                '<input class="asm-checkbox" type="checkbox" id="puttosleep" data-json="PUTTOSLEEP" data-post="puttosleep" title="' + html.title(_("This animal was euthanized")) + '" />',
                '<label for="deadonarrival">' + _("Dead on arrival") + '</label>',
                '<input class="asm-checkbox" type="checkbox" id="deadonarrival" data-json="ISDOA" data-post="deadonarrival" title="' + html.title(_("This animal was dead on arrival to the shelter")) + '" />',
                '<label for="diedoffshelter">' + _("Died off shelter") + '</label>',
                '<input class="asm-checkbox" type="checkbox" id="diedoffshelter" data-json="DIEDOFFSHELTER" data-post="diedoffshelter" title="' + html.title(_("This animal died outside the care of the shelter, and the death should be kept out of reports")) + '" />',
                '</td>',
                '</tr>',
                '</table>',
                '<div>',
                _("Notes") + '<br />',
                '<textarea class="asm-textarea" title="' + html.title(_("Notes about the death of the animal")) + '" id="ptsreason" data-json="PTSREASON" data-post="ptsreason" rows="8"></textarea>',
                '</div>',
                '</div>'
            ].join("\n");
        },

        render_details: function() {
            return [
                '<h3><a href="#">' + _("Details") + '</a></h3>',
                '<div>',
                '<table width="100%">',
                '<tr>',
                '<!-- left table -->',
                '<td width="40%">',
                '<table>',
                '<tr>',
                '<td><label for="sheltercode">' + _("Code") + '</label></td>',
                '<td nowrap="nowrap">',
                '<input type="text" id="sheltercode" data-json="SHELTERCODE" data-post="sheltercode" class="asm-halftextbox" title="' + html.title(_("The shelter reference number")) + '"  />',
                '<input type="text" id="shortcode" data-json="SHORTCODE" data-post="shortcode" class="asm-halftextbox" title="' + html.title(_("A short version of the reference number")) + '" />',
                '<input type="hidden" id="yearcode" data-json="YEARCODEID" data-post="yearcode" />',
                '<input type="hidden" id="uniquecode" data-json="UNIQUECODEID" data-post="uniquecode" />',
                '</td>',
                '<td>',
                '<button id="button-gencode">' + _("Generate a new animal code") + '</button>',
                '</td>',
                '</tr>',
                '<tr id="litteridrow">',
                '<td>',
                '<label for="litterid">' + _("Litter") + '</label></td>',
                '<td><input type="text" id="litterid" data-json="ACCEPTANCENUMBER" data-post="litterid" class="asm-textbox" title="' + html.title(_("The litter this animal belongs to")) + '" />',
                '</td>',
                '</tr>',
                '<tr>',
                '<td><label for="animalname">' + _("Name") + '</label></td>',
                '<td><input type="text" id="animalname" data-json="ANIMALNAME" data-post="animalname" maxlength="255" class="asm-textbox" title="' + html.title(_("The animal name")) + '" />',
                '</td>',
                '<td>',
                '<button id="button-randomname">' + _("Generate a random name for this animal") + '</button>',
                '</td>',
                '</tr>',
                '<tr>',
                '<td><label for="sex">' + _("Sex") + '</label></td>',
                '<td><select id="sex" data-json="SEX" data-post="sex" class="asm-selectbox" title="' + html.title(_("The animal sex")) + '">',
                html.list_to_options(controller.sexes, "ID", "SEX"),
                '</select></td>',
                '</tr>',
                '<tr>',
                '<td><label for="animaltype">' + _("Type") + '</label></td>',
                '<td><select id="animaltype" data-json="ANIMALTYPEID" data-post="animaltype" class="asm-selectbox" title="' + html.title(_("The shelter category for this animal")) + '">',
                html.list_to_options(controller.animaltypes, "ID", "ANIMALTYPE"),
                '</select></td>',
                '</tr>',
                '<tr>',
                '<td><label for="basecolour">' + _("Color") + '</label></td>',
                '<td><select id="basecolour" data-json="BASECOLOURID" data-post="basecolour" class="asm-selectbox" title="' + html.title(_("The base color of this animal")) + '">',
                html.list_to_options(controller.colours, "ID", "BASECOLOUR"),
                '</select></td>',
                '</tr>',
                '<tr id="coattyperow">',
                '<td><label for="coattype">' + _("Coat Type") + '</label></td>',
                '<td><select id="coattype" data-json="COATTYPE" data-post="coattype" class="asm-selectbox" title="' + html.title(_("The coat type of this animal")) + '">',
                html.list_to_options(controller.coattypes, "ID", "COATTYPE"),
                '</select></td>',
                '</tr>',
                '<tr id="sizerow">',
                '<td><label for="size">' + _("Size") + '</label></td>',
                '<td><select id="size" data-json="SIZE" data-post="size" class="asm-selectbox" title="' + html.title(_("The size of this animal")) + '">',
                html.list_to_options(controller.sizes, "ID", "SIZE"),
                '</select></td>',
                '</tr>',
                '<tr id="kilosrow">',
                '<td><label for="weight">' + _("Weight") + '</label></td>',
                '<td><span style="white-space: nowrap;">',
                '<input id="weight" data-json="WEIGHT" data-post="weight" class="asm-textbox asm-halftextbox asm-numberbox" />',
                '<label id="kglabel">' + _("kg") + '</label>',
                '</span>',
                '</td>',
                '</tr>',
                '<tr id="poundsrow">',
                '<td><label for="weightlb">' + _("Weight") + '</label></td>',
                '<td><span style="white-space: nowrap;">',
                '<input id="weightlb" class="asm-textbox asm-intbox" style="width: 70px" />',
                '<label id="lblabel">' + _("lb") + '</label>',
                '<input id="weightoz" class="asm-textbox asm-intbox" style="width: 70px" />',
                '<label id="ozlabel">' + _("oz") + '</label>',
                '</span>',
                '</td>',
                '</tr>',
                '</table>',
                '<!-- right table -->',
                '<td>',
                '<table>',
                '<tr>',
                '<td>',
                '<!-- second column-->',
                '<table class="additionaltarget" data="to2">',
                '<tr>',
                '<td><label for="species">' + _("Species") + '</label></td>',
                '<td><select id="species" data-json="SPECIESID" data-post="species" class="asm-selectbox" title="' + html.title(_("The species of this animal")) + '">',
                html.list_to_options(controller.species, "ID", "SPECIESNAME"),
                '</select></td>',
                '</tr>',
                '<tr>',
                '<td><label for="breed1">' + _("Breed") + '</label></td>',
                '<td><select id="breed1" data-json="BREEDID" data-post="breed1" class="asm-selectbox" title="' + html.title(_("The primary breed of this animal")) + '">',
                html.list_to_options_breeds(controller.breeds),
                '</select>',
                '<select id="breedp" class="asm-selectbox" style="display:none;">',
                html.list_to_options_breeds(controller.breeds),
                '</select></td>',
                '</tr>',
                '<tr id="secondbreedrow">',
                '<td>',
                '<span style="white-space: nowrap">',
                '<label for="crossbreed">' + _("Crossbreed") + '</label>',
                '<input type="checkbox" class="asm-checkbox" id="crossbreed" data-json="CROSSBREED" data-post="crossbreed" title="' + _("This animal is a crossbreed") + '" /></td>',
                '</span>',
                '<td><select id="breed2" data-json="BREED2ID" data-post="breed2" class="asm-selectbox" title="' + html.title(_("The secondary breed of this animal")) + '">',
                html.list_to_options_breeds(controller.breeds),
                '</select></td>',
                '</tr>',
                '<tr id="locationrow">',
                '<td><label for="location">' + _("Location") + '</label></td>',
                '<td>',
                '<input id="archived" data-json="ARCHIVED" type="hidden" />',
                '<input id="displaylocationname" data-json="DISPLAYLOCATIONNAME" type="hidden" />',
                '<select id="location" data-json="SHELTERLOCATION" data-post="location" class="asm-selectbox" title="' + html.title(_("Where this animal is located within the shelter")) + '">',
                html.list_to_options(controller.internallocations, "ID", "LOCATIONNAME"),
                '</select></td>',
                '</tr>',
                '<tr id="locationunitrow">',
                '<td><label for="unit">' + _("Unit") + '</label></td>',
                '<td>',
                '<input id="unit" data-json="SHELTERLOCATIONUNIT" data-post="unit" class="asm-textbox" title="' + html.title(_("Unit within the location, eg: pen or cage number")) + '" />',
                '</td>',
                '</tr>',
                '<tr id="lastlocation">',
                '<td><label>' + _("Last Location") + '</label></td>',
                '<td>',
                '<a class="asm-embed-name" href="animal_find_results?logicallocation=onshelter&shelterlocation=' + controller.animal.SHELTERLOCATION + '">' + controller.animal.SHELTERLOCATIONNAME + ' ' + common.nulltostr(controller.animal.SHELTERLOCATIONUNIT) + '</a>',
                '</td>',
                '</tr>',
                '<tr id="onshelterflags">',
                '<td><label for="flags">' + _("Flags") + '</label></td>',
                '<td>',
                '<select id="flags" data="flags" class="asm-bsmselect" multiple="multiple">',
                '</select>',
                '</td>',
                '</tr>',
                '<tr>',
                '<td><label for="dateofbirth">' + _("Date of Birth") + '</label></td>',
                '<td><input id="dateofbirth" data-json="DATEOFBIRTH" data-post="dateofbirth" class="asm-datebox asm-halftextbox" title="' + _("The date the animal was born") + '" />',
                '<input class="asm-checkbox" type="checkbox" id="estimateddob" data-json="ESTIMATEDDOB" data-post="estimateddob" title="' + _("This date of birth is an estimate") + '" />',
                _("Estimate"),
                '</td>',
                '</tr>',
                '<tr id="feerow">',
                '<td><label for="fee">' + _("Adoption Fee") + '</label></td>',
                '<td><input id="fee" data-json="FEE" data-post="fee" class="asm-currencybox asm-textbox" /></td>',
                '</tr>',
                '<!-- end second column -->',
                '</table>',
                '</td>',
                '</tr>',
                '<!-- end right table -->',
                '</table>',
                '</td>',

                '<!-- end outer table -->',
                '</tr>',
                '</table>',
                '</div>'
            ].join("\n");
        },

        render_entry: function() {
            return [
                '<h3><a href="#">' + _("Entry") + '</a></h3>',
                '<div>',
                '<!-- outer table -->',
                '<table width="100%">',
                '<tr>',
                '<td width="50%">',
                '<!-- left table -->',
                '<table width="100%">',
                '<tr id="originalownerrow">',
                '<td valign="top" class="bottomborder">',
                '<label for="originalowner">' + _("Original Owner") + '</label>',
                '</td>',
                '<td valign="top" class="bottomborder">',
                '<input id="originalowner" data-json="ORIGINALOWNERID" data-post="originalowner" type="hidden" class="asm-personchooser" />',
                '</td>',
                '</tr>',
                '<tr id="broughtinbyownerrow">',
                '<td valign="top">',
                '<label for="broughtinby">' + _("Brought In By") + '</label>',
                '</td>',
                '<td valign="top">',
                '<input id="broughtinby" data-json="BROUGHTINBYOWNERID" data-post="broughtinby" type="hidden" class="asm-personchooser" />',
                '</td>',
                '</tr>',
                '</table>',
                '<!-- right table -->',
                '</td>',
                '<td width="50%">',
                '<table width="100%" class="additionaltarget" data="to4">',
                '<tr id="datebroughtinrow">',
                '<td>',
                '<label for="datebroughtin">' + _("Date Brought In") + '</label>',
                '</td>',
                '<td>',
                '<input id="datebroughtin" data-json="DATEBROUGHTIN" data-post="datebroughtin" class="asm-textbox asm-datebox" title="' + html.title(_("The date the animal was brought into the shelter")) + '" />',
                '</td>',
                '</tr>',
                '<tr id="timebroughtinrow">',
                '<td>',
                '<label for="timebroughtin">' + _("Time Brought In") + '</label>',
                '</td>',
                '<td>',
                '<input id="timebroughtin" data-json="DATEBROUGHTIN" data-post="timebroughtin" class="asm-textbox asm-timebox" />',
                '</td>',
                '</tr>',
                '<tr id="entryreasonrow">',
                '<td><label for="entryreason">' + _("Entry Category") + '</label></td>',
                '<td><select id="entryreason" data-json="ENTRYREASONID" data-post="entryreason" class="asm-selectbox" title=',
                '"' + html.title(_("The entry reason for this animal")) + '">',
                html.list_to_options(controller.entryreasons, "ID", "REASONNAME"),
                '</select></td>',
                '</tr>',
                '<tr class="asilomar">',
                '<td><label for="asilomarintakecategory">' + "Asilomar Category" + '</label></td>',
                '<td><select id="asilomarintakecategory" data-json="ASILOMARINTAKECATEGORY" data-post="asilomarintakecategory" class="asm-selectbox">',
                '<option value="0">Healthy</option>',
                '<option value="1">Treatable - Rehabilitatable</option>',
                '<option value="2">Treatable - Manageable</option>',
                '<option value="3">Unhealthy and Untreatable</option>',
                '</select></td>',
                '</tr>',
                '<tr id="transferinrow">',
                '<td></td>',
                '<td>',
                '<input class="asm-checkbox" type="checkbox" id="transferin" data-json="ISTRANSFER" data-post="transferin" title=',
                '"' + html.title(_("This animal was transferred from another shelter")) + '" />',
                '<label for="transferin">' + _("Transfer In") + '</label>',
                '</td>',
                '</tr>',
                '<tr id="pickeduprow">',
                '<td></td>',
                '<td>',
                '<span style="white-space: nowrap">',
                '<input class="asm-checkbox" type="checkbox" id="pickedup" data-json="ISPICKUP" data-post="pickedup" title=',
                '"' + html.title(_("This animal was picked up")) + '" />',
                '<label for="pickedup">' + _("Picked Up") + '</label>',
                '</span>',
                '</td>',
                '</tr>',
                '<tr id="pickuplocationrow">',
                '<td>',
                '<label for="pickuplocation">' + _("Pickup Location") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="pickuplocation" data-json="PICKUPLOCATIONID" data-post="pickuplocation" title="' + html.title(_("The location where the animal was picked up")) + '">',
                html.list_to_options(controller.pickuplocations, "ID", "LOCATIONNAME"),
                '</select></td>',
                '</tr>',
                '<tr id="pickedupbyrow">',
                '<td valign="top">',
                '<label for="pickedupby">' + _("Picked Up By") + '</label>',
                '</td>',
                '<td valign="top">',
                '<input id="pickedupby" data-json="PICKEDUPBYOWNERID" data-post="pickedupby" data-filter="aco" type="hidden" class="asm-personchooser" />',
                '</td>',
                '</tr>',
                '<tr id="holdrow">',
                '<td></td>',
                '<td>',
                '<span style="white-space: nowrap">',
                '<input class="asm-checkbox" type="checkbox" id="hold" data-json="ISHOLD" data-post="hold" title=',
                '"' + html.title(_("This animal should be held in case it is reclaimed")) + '" />',
                '<label for="hold">' + _("Hold until") + '</label>',
                '<input class="asm-halftextbox asm-datebox" id="holduntil" data-json="HOLDUNTILDATE" data-post="holduntil" title=',
                '"' + html.title(_("Hold the animal until this date or blank to hold indefinitely")) + '" />',
                '</span>',
                '</td>',
                '</tr>',
                '<tr class="asilomar">',
                '<td></td>',
                '<td>',
                '<input class="asm-checkbox" type="checkbox" id="asilomartransferexternal" data-json="ASILOMARISTRANSFEREXTERNAL" data-post="asilomartransferexternal" title=',
                '"' + html.title("This animal was transferred in from outside the community/coalition") + '" />',
                '<label for="asilomartransferexternal">' + "Outside community/coalition" + '</label>',
                '</td>',
                '</tr>',
                '<tr class="asilomar">',
                '<td></td>',
                '<td>',
                '<input class="asm-checkbox asilomar" type="checkbox" id="asilomarownerrequested" data-json="ASILOMAROWNERREQUESTEDEUTHANASIA" data-post="asilomarownerrequested" title="' + html.title("The owner requested euthanasia") + '" />',
                '<label class="asilomar" for="asilomarownerrequested">' + "Owner requested euthanasia" + '</label>',
                '</td></tr>',
                '<tr id="bondedwith1row">',
                '<td>',
                '<label for="bonded1">' + _("Bonded With") + '</label>',
                '</td>',
                '<td>',
                '<input id="bonded1" data-json="BONDEDANIMALID" data-post="bonded1" type="hidden" class="asm-animalchooser" />',
                '</td>',
                '</tr>',
                '<tr id="bondedwith2row">',
                '<td></td>',
                '<td>',
                '<input id="bonded2" data-json="BONDEDANIMAL2ID" data-post="bonded2" type="hidden" class="asm-animalchooser" />',
                '</td>',
                '</tr>',
                '<tr id="reasonnotfromownerrow">',
                '<td>',
                '<label for="reasonnotfromowner">' + _("Reason not from Owner") + '</label>',
                '</td>',
                '<td>',
                '<textarea class="asm-textarea" id="reasonnotfromowner" title="' + html.title(_("Reason the owner did not bring in the animal themselves")) + '" ',
                'data-json="REASONNO" data-post="reasonnotfromowner" rows="2"></textarea>',
                '</td>',
                '</tr>',
                '<tr id="reasonforentryrow">',
                '<td>',
                '<label for="reasonforentry">' + _("Reason for Entry") + '</label>',
                '</td>',
                '<td>',
                '<textarea class="asm-textarea" title="' + _("Reason for entry") + '" id="reasonforentry" data-json="REASONFORENTRY" data-post="reasonforentry" rows="2"></textarea>',
                '</td>',
                '</tr>',
                '</table>',
                '<!-- end outer table -->',
                '</td>',
                '</tr>',
                '</table>',
                '</div>'
            ].join("\n");
        },

        render_health_and_identification: function() {
            return [
                '<h3><a href="#">' + _("Health and Identification") + ' <span id="tabhealth" style="display: none" class="asm-icon asm-icon-health"></span></a></h3><div>',
                '<!-- Outer table -->',
                '<table width="100%">',
                '<tr>',
                '<td>',
                '<!-- Tested flags -->',
                '<table>',
                '<tr id="microchiprow">',
                '<td nowrap="nowrap">',
                '<input class="asm-checkbox" type="checkbox" id="microchipped" data-json="IDENTICHIPPED" data-post="microchipped" title="' + html.title(_("This animal is microchipped")) + '" />',
                '<label for="microchipped">' + _("Microchipped") + '</label>',
                '</td>',
                '<td>',
                '<input id="microchipdate" data-json="IDENTICHIPDATE" data-post="microchipdate" class="asm-halftextbox asm-datebox" title="' + html.title(_("The date the animal was microchipped")) + '" />',
                '</td>',
                '<td>',
                '<input type="text" id="microchipnumber" data-json="IDENTICHIPNUMBER" data-post="microchipnumber" class="asm-textbox" title="' + html.title(_("The microchip number")) + '" /> <span id="microchipbrand"></span>',
                '</td>',
                '</tr>',
                '<tr id="tattoorow">',
                '<td>',
                '<input class="asm-checkbox" type="checkbox" id="tattoo" data-json="TATTOO" data-post="tattoo" title="' + html.title(_("This animal has a tattoo")) + '" />',
                '<label for="tattoo">' + _("Tattoo") + '</label>',
                '</td>',
                '<td>',
                '<input id="tattoodate" data-json="TATTOODATE" data-post="tattoodate" class="asm-halftextbox asm-datebox" title="' + html.title(_("The date the animal was tattooed")) + '" />',
                '</td>',
                '<td>',
                '<input type="text" id="tattoonumber" data-json="TATTOONUMBER" data-post="tattoonumber" class="asm-textbox" title="' + html.title(_("The tattoo number")) + '" />',
                '</td>',
                '</tr>',
                '<tr id="smarttagrow">',
                '<td>',
                '<input class="asm-checkbox" type="checkbox" id="smarttag" data-json="SMARTTAG" data-post="smarttag" title="' + html.title(_("This animal has a SmartTag PETID")) + '" />',
                '<label for="smarttag">' + _("SmartTag PETID") + '</label>',
                '</td>',
                '<td>',
                '<input id="smarttagnumber" data-json="SMARTTAGNUMBER" data-post="smarttagnumber" class="asm-halftextbox asm-alphanumberbox" title="' + html.title(_("The SmartTag PETID number")) + '" />',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="smarttagtype" data-json="SMARTTAGTYPE" data-post="smarttagtype" title="' + html.title(_("The SmartTag type")) + '">',
                '<option value="0">' + _("Annual") + '</option>',
                '<option value="1">' + _("5 Year") + '</option>',
                '<option value="2">' + _("Lifetime") + '</option>',
                '</select>',
                '</td>',
                '</tr>',
                '<tr id="neuteredrow">',
                '<td>',
                '<input class="asm-checkbox" type="checkbox" id="neutered" data-json="NEUTERED" data-post="neutered" title="' + html.title(_("This animal has been altered")) + '" />',
                '<label for="neutered">' + _("Altered") + '</label>',
                '</td>',
                '<td>',
                '<input id="neutereddate" data-json="NEUTEREDDATE" data-post="neutereddate" class="asm-halftextbox asm-datebox" title="' + html.title(_("The date the animal was altered")) + '" />',
                '</td>',
                '</tr>',
                '<tr>',
                '<td>',
                '<input class="asm-checkbox" type="checkbox" id="declawed" data-json="DECLAWED" data-post="declawed" title="' + html.title(_("This animal has been declawed")) + '" />',
                '<label id="declawed-label" for="declawed">' + _("Declawed") + '</label>',
                '</td>',
                '</tr>',
                '<tr id="heartwormrow">',
                '<td>',
                '<input class="asm-checkbox" type="checkbox" id="heartwormtested" data-json="HEARTWORMTESTED" data-post="heartwormtested" title="' + html.title(_("This animal has been heartworm tested")) + '" />',
                '<label for="heartwormtested">' + _("Heartworm Tested") + '</label>',
                '</td>',
                '<td>',
                '<input id="heartwormtestdate" data-json="HEARTWORMTESTDATE" data-post="heartwormtestdate" class="asm-halftextbox asm-datebox" title="' + html.title(_("The date the animal was heartworm tested")) + '" />',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="heartwormtestresult" data-json="HEARTWORMTESTRESULT" data-post="heartwormtestresult" title="' + html.title(_("The result of the heartworm test")) + '">',
                html.list_to_options(controller.posneg, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',
                '<tr id="fivlrow">',
                '<td>',
                '<input class="asm-checkbox" type="checkbox" id="fivltested" data-json="COMBITESTED" data-post="fivltested" title="' + html.title(_("This animal has been FIV/L tested")) + '" />',
                '<label for="fivltested">' + _("FIV/L Tested") + '</label>',
                '</td>',
                '<td>',
                '<input id="fivltestdate" data-json="COMBITESTDATE" data-post="fivltestdate" class="asm-halftextbox asm-datebox" title="' + html.title(_("The date the animal was FIV/L tested")) + '" />',
                '</td>',
                '<td>',
                '<select class="asm-halftextbox selectbox" id="fivresult" data-json="COMBITESTRESULT" data-post="fivresult" title="' + html.title(_("The result of the FIV test")) + '">',
                html.list_to_options(controller.posneg, "ID", "NAME"),
                '</select>',
                '<select class="asm-halftextbox selectbox" id="flvresult" data-json="FLVRESULT" data-post="flvresult" title="' + html.title(_("The result of the FLV test")) + '">',
                html.list_to_options(controller.posneg, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',

                '<tr>',
                '<td>',
                '<input class="asm-checkbox" type="checkbox" id="specialneeds" data-json="HASSPECIALNEEDS" data-post="specialneeds" title="' + _("This animal has special needs") + '"  />',
                '<label for="specialneeds">' + _("Special Needs") + '</label>',
                '</td>',
                '</tr>',
                '<!-- end flag table -->',
                '</table>',
                '<!-- separate table for additional fields -->',
                '<table class="additionaltarget" data="to5">',
                '<tr id="rabiestagrow">',
                '<td><label for="rabiestag">' + _("Rabies Tag") + '</label></td>',
                '<td><input id="rabiestag" data-json="RABIESTAG" data-post="rabiestag" class="asm-textbox" maxlength="20" />',
                '</td>',
                '</tr>',
                '</table>',
                '</td>',
                '<td>',
                '<!-- health problems/vet fields -->',
                '<label for="healthproblems">' + _("Health Problems") + '</label><br />',
                '<textarea id="healthproblems" title="' + html.title(_("Any health problems the animal has")) + '" data-json="HEALTHPROBLEMS" data-post="healthproblems" class="asm-textarea" rows="4"></textarea>',
                '<table>',
                '</table>',
                '<table>',
                '<tr>',
                '<td valign="top" class="bottomborder">',
                '<label for="currentvet">' + _("Current Vet") + '</label>',
                '</td>',
                '<td valign="top" class="bottomborder">',
                '<input id="currentvet" data-json="CURRENTVETID" data-post="currentvet" type="hidden" data-filter="vet" class="asm-personchooser" />',
                '</td>',
                '</tr>',
                '<tr>',
                '<td valign="top">',
                '<label for="ownersvet">' + _("Owners Vet") + '</label>',
                '</td>',
                '<td valign="top">',
                '<input id="ownersvet" data-json="OWNERSVETID" data-post="ownersvet" type="hidden" data-filter="vet" class="asm-personchooser"  />',
                '</td>',
                '</tr>',
                '</table>',
                '<!-- end outer table -->',
                '</td>',
                '</tr>',
                '</table>',
                '</div>'
            ].join("\n");
        },

        render_notes: function() {
            return [
                '<h3><a href="#">' + _("Notes") + '</a></h3>',
                '<div>',
                '<!-- Outer table -->',
                '<table width="100%">',
                '<tr>',
                '<td>',
                '<!-- Comments table -->',
                '<table>',
                '<tr id="markingsrow">',
                '<td>',
                '<label for="markings">' + _("Markings") + '</label>',
                '</td>',
                '<td width="80%">',
                '<textarea class="asm-textarea" title="' + html.title(_("Any markings or distinguishing features the animal has")) + '" id="markings" data-json="MARKINGS" data-post="markings" rows="3"></textarea>',
                '</td>',
                '</tr>',
                '<tr id="hiddencommentsrow">',
                '<td>',
                '<label for="hiddencomments">' + _("Hidden Comments") + '</label>',
                '</td>',
                '<td>',
                '<textarea class="asm-textarea" title="' + html.title(_("Hidden comments about the animal")) + '" id="hiddencomments" data-json="HIDDENANIMALDETAILS" data-post="hiddencomments" rows="3"></textarea>',
                '</td>',
                '</tr>',
                '<tr id="commentsrow">',
                '<td>',
                '<label for="comments">' + _("Comments") + '</label>',
                '<button id="button-commentstomedia">' + _('Copy animal comments to the notes field of the web preferred media for this animal') + '</button>',
                '</td>',
                '<td>',
                '<textarea class="asm-textarea" title="' + html.title(_("Comments")) + '" id="comments" data-json="ANIMALCOMMENTS" data-post="comments" rows="3"></textarea>',
                '</td>',
                '</tr>',
                '</table>',
                '</td>',
                '<td>',
                '<!-- Good with table -->',
                '<table class="additionaltarget" data="to3">',
                '<tr class="goodwith">',
                '<td>',
                '<label for="goodwithcats">' + _("Good with cats") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="goodwithcats" data-json="ISGOODWITHCATS" data-post="goodwithcats">',
                html.list_to_options(controller.ynun, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',
                '<tr class="goodwith">',
                '<td>',
                '<label for="goodwithdogs">' + _("Good with dogs") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="goodwithdogs" data-json="ISGOODWITHDOGS" data-post="goodwithdogs">',
                html.list_to_options(controller.ynun, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',
                '<tr class="goodwith">',
                '<td>',
                '<label for="goodwithkids">' + _("Good with kids") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="goodwithkids" data-json="ISGOODWITHCHILDREN" data-post="goodwithkids">',
                html.list_to_options(controller.ynun, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',
                '<tr class="goodwith">',
                '<td>',
                '<label for="housetrained">' + _("Housetrained") + '</label>',
                '</td>',
                '<td>',
                '<select class="asm-selectbox" id="housetrained" data-json="ISHOUSETRAINED" data-post="housetrained">',
                html.list_to_options(controller.ynun, "ID", "NAME"),
                '</select>',
                '</td>',
                '</tr>',
                '<!-- end good with -->',
                '</table>',
                '<!-- end outer table -->',
                '</td>',
                '</tr>',
                '</table>',
                '</div>'
            ].join("\n");
        },

        render_publish_history: function() {
            
            if (controller.publishhistory.length == 0) {
                return;
            }

            var pname = function(p) {
                var t = p;
                if (p == "html") { t = html.icon("web") + " " + _("Published to Website"); }
                else if (p == "petfinder") { t = "Published to petfinder.com"; }
                else if (p == "adoptapet") { t = "Published to adoptapet.com"; }
                else if (p == "rescuegroups") { t = "Published to rescuegroups.org"; }
                else if (p == "meetapet") { t = "Published to meetapet.com"; }
                else if (p == "helpinglostpets") { t = "Published to helpinglostpets.com"; }
                else if (p == "petrescue") { t = "Published to petrescue.com.au"; }
                
                else if (p == "petlink") { t = html.icon("microchip") + " Microchip registered with PetLink"; }
                else if (p == "pettracuk") { t = html.icon("microchip") + " Microchip registered with AVID/PETtrac UK"; }
                else if (p == "anibaseuk") { t = html.icon("microchip") + " Microchip registered with idENTICHIP/Anibase UK"; }
                else if (p == "smarttag") { t = html.icon("microchip") + " Microchip/Tag registered with SmartTag"; }
                else if (p == "akcreunite") { t = html.icon("microchip") + " Microchip registered with AKC Reunite"; }
                else if (p == "homeagain") { t = html.icon("microchip") + " Microchip registered with HomeAgain"; }

                else if (p == "facebook") { t = html.icon("facebook") + " Shared on Facebook"; }
                else if (p == "twitter") { t = html.icon("twitter") + " Shared on Twitter"; }
                else if (p == "gplus") { t = html.icon("gplus") + " Shared on Google+"; }
                else if (p == "pinterest") { t = html.icon("pinterest") + " Shared on Pinterest"; }
                else if (p == "tumblr") { t = html.icon("tumblr") + " Shared on Tumblr"; }

                return t;
            },
            h = [
                '<h3><a href="#">' + _("Publishing History") + '</a></h3>',
                '<div>'
            ];

            $.each(controller.publishhistory, function(i, v) {
                var err = "";
                if (v.EXTRA) { err = " : <span style='color: red'>" + v.EXTRA + "</span>"; }
                h.push('<p>' + format.date(v.SENTDATE) + ' - ' + pname(v.PUBLISHEDTO) + err + '</p>');
            });

            h.push('</div>');
            return h.join("\n");
        },

        /**
         * Render the animal details screen
         */
        render: function() {
            var h = [
                '<div id="button-document-body" class="asm-menu-body">',
                '<ul class="asm-menu-list">',
                edit_header.template_list(controller.templates, "ANIMAL", controller.animal.ID),
                '</ul>',
                '</div>',
                '<div id="button-diarytask-body" class="asm-menu-body">',
                '<ul class="asm-menu-list">',
                edit_header.diary_task_list(controller.diarytasks, "ANIMAL"),
                '</ul>',
                '</div>',
                '<div id="dialog-dt-date" style="display: none" title="' + _("Select date for diary task") + '">',
                '<input type="hidden" id="diarytaskid" />',
                '<table width="100%">',
                '<tr>',
                '<td><label for="seldate">' + _("Date") + '</label></td>',
                '<td><input id="seldate" type="text" class="asm-textbox asm-datebox" /></td>',
                '</tr>',
                '</table>',
                '</div>',
                '<div id="button-share-body" class="asm-menu-body">',
                '<ul class="asm-menu-list">',
                    '<li id="button-shareweb" class="sharebutton asm-menu-item"><a '
                        + '" target="_blank" href="#">' + html.icon("web") + ' ' + _("Link to this animal") + '</a></li>',
                    '<li id="button-shareemail" class="sharebutton asm-menu-item"><a '
                        + '" target="_blank" href="#">' + html.icon("email") + ' ' + _("Email") + '</a></li>',
                    '<li id="button-social" class="sharebutton asm-menu-category">' + _("Social") + ' </li>',
                    '<li id="button-facebook" class="sharebutton asm-menu-item"><a '
                        + '" target="_blank" href="#">' + html.icon("facebook") + ' ' + _("Facebook") + '</a></li>',
                    '<li id="button-twitter" class="sharebutton asm-menu-item"><a '
                        + '" target="_blank" href="#">' + html.icon("twitter") + ' ' + _("Twitter") + '</a></li>',
                    '<li id="button-gplus" class="sharebutton asm-menu-item"><a '
                        + '" target="_blank" href="#">' + html.icon("gplus") + ' ' + _("Google+") + '</a></li>',
                    '<li id="button-pinterest" class="sharebutton asm-menu-item"><a '
                        + '" target="_blank" href="#">' + html.icon("pinterest") + ' ' + _("Pinterest") + '</a></li>',
                    '<li id="button-tumblr" class="sharebutton asm-menu-item"><a '
                        + '" target="_blank" href="#">' + html.icon("tumblr") + ' ' + _("Tumblr") + '</a></li>',

                '</ul>',
                '</div>',
                edit_header.animal_edit_header(controller.animal, "animal", controller.tabcounts),
                tableform.buttons_render([
                    { id: "save", text: _("Save"), icon: "save", tooltip: _("Save this person") },
                    { id: "clone", text: _("Clone"), icon: "copy", tooltip: _("Create a new animal by copying this one") },
                    { id: "delete", text: _("Delete"), icon: "delete", tooltip: _("Delete this animal") },
                    { id: "document", text: _("Document"), type: "buttonmenu", icon: "document", tooltip: _("Generate a document from this animal") },
                    { id: "diarytask", text: _("Diary Task"), type: "buttonmenu", icon: "diary-task", tooltip: _("Create diary notes from a task") },
                    { id: "match", text: _("Match"), icon: "match", tooltip: _("Match this animal with the lost and found database") },
                    { id: "littermates", text: _("Littermates"), icon: "litter", tooltip: _("View littermates") },
                    { id: "share", text: _("Share"), type: "buttonmenu", icon: "social" }
                ]),
                '<div id="asm-details-accordion">',
                this.render_details(),
                this.render_notes(),
                '<h3 id="asm-additional-accordion"><a href="#">' + _("Additional") + '</a></h3>',
                '<div>',
                additional.additional_fields(controller.additional),
                '</div>',
                this.render_entry(),
                this.render_health_and_identification(),
                this.render_death(),
                this.render_publish_history(),
                '</div>', // accordion
                '</div>', // asmcontent
                '</div>'  // tabs
            ].join("\n");
            return h;
        },

        /* Update the breed selects to only show the breeds for the selected species.
         * If no breeds are available the species will be displayed.
         * */
        update_breed_list: function() {
            $('optgroup', $('#breed1')).remove();
            $('#breedp optgroup').clone().appendTo($('#breed1'));
            $('#breed1').children().each(function(){
                if($(this).attr('id') != 'ngp-'+$('#species').val()){
                    $(this).remove();
                }
            });
            if($('#breed1 option').size() == 0) {
                $('#breed1').append("<option value='0'>"+$('#species option:selected').text() + "</option>");
            }
            $('optgroup', $('#breed2')).remove();
            $('#breedp optgroup').clone().appendTo($('#breed2'));
            $('#breed2').children().each(function(){
                if($(this).attr('id') != 'ngp-'+$('#species').val()) {
                    $(this).remove();
                }
            });
            if ($('#breed2 option').size() == 0) {
                $('#breed2').append("<option value='0'>"+$('#species option:selected').text()+"</option>");
            }
        },

        // Update the units available for the selected location
        update_units: function() {
            common.ajax_post("animal_new", "mode=units&locationid=" + $("#location").val())
                .then(function(data) {
                    var src = [];
                    $.each(html.decode(data).split("&&"), function(i, v) {
                        var u = v.split("|");
                        var unit = u[0], desc = u[1];
                        if (!unit) { return false; }
                        if (!desc) { desc = _("(available)"); }
                        src.push({ label: unit + ' : ' + desc, value: unit });
                    });
                    // Load the unit source and trigger display of the
                    // dropdown on focus
                    $("#unit").autocomplete({ source: src }).bind('focus', function() { 
                        $(this).autocomplete("search", ":"); 
                    });
                });
        },

        /** 
         *  Enable widgets based on loaded data, security and configuration options
         */
        enable_widgets: function() {

            // DATA ===========================================

            // Hide additional accordion section if there aren't
            // any additional fields declared
            var ac = $("#asm-additional-accordion");
            var an = ac.next();
            if (an.find(".additional").length == 0) {
                ac.hide(); an.hide();
            }
            
            // Crossbreed flag being unset hides second breed field
            if ($("#crossbreed").is(":checked")) {
                $("#breed2").fadeIn();
            }
            else {
                $("#breed2").fadeOut();
                $("#breed2").select("value", $("#breed1").select("value"));
            }
            
            // Show/hide death fields based on deceased date
            if ($("#deceaseddate").val() == "") {
                $("#deathcategory").closest("tr").fadeOut();
                $("#puttosleep").closest("tr").fadeOut();
                $("#ptsreason").closest("div").fadeOut();
            }
            else {
                $("#deathcategory").closest("tr").fadeIn();
                $("#puttosleep").closest("tr").fadeIn();
                $("#ptsreason").closest("div").fadeIn();
            }

            // Enable/disable health and identification fields based on checkboxes
            $("#microchipdate, #microchipnumber").toggle($("#microchipped").is(":checked"));
            $("#tattoodate, #tattoonumber").toggle($("#tattoo").is(":checked"));
            $("#smarttagnumber, #smarttagtype").toggle($("#smarttag").is(":checked"));
            $("#neutereddate").toggle($("#neutered").is(":checked"));
            $("#heartwormtestdate, #heartwormtestresult").toggle($("#heartwormtested").is(":checked"));
            $("#fivltestdate, #fivresult, #flvresult").toggle($("#fivltested").is(":checked"));

            // Show pickup fields if the animal is a pickup
            $("#pickedupbyrow, #pickuplocationrow").toggle($("#pickedup").is(":checked"));

            // If the user ticked hold, there's no hold until date and
            // we have an auto remove days period, default the date
            if ($("#hold").is(":checked") && $("#holduntil").val() == "" && config.integer("AutoRemoveHoldDays") > 0) {
                var holddate = format.date_js(controller.animal.DATEBROUGHTIN).getTime();
                holddate += config.integer("AutoRemoveHoldDays") * 86400000;
                holddate = format.date( new Date(holddate) );
                $("#holduntil").val(holddate);
            }

            // If we're a US shelter, show the asilomar categories
            if (asm.locale == "en" && !config.bool("DisableAsilomar")) {
                $(".asilomar").show();
            }
            else {
                $(".asilomar").hide();
            }

            // If the animal doesn't have a litterid, disable the littermates button
            if ($("#litterid").val() == "")  {
                $("#button-littermates").button("disable");
            }
            else {
                $("#button-littermates").button("enable");
            }

            // Not having any active litters disables join litter button
            if ($("#sellitter option").size() == 0) {
                $("#button-litterjoin").button("disable");
            }

            // Hide the internal location dropdown row if the animal is off the shelter
            // or dead and show the last location info instead.
            if (controller.animal.ACTIVEMOVEMENTID || controller.animal.DECEASEDDATE) {
                $("#locationrow").hide();
                $("#locationunitrow").hide();
                $("#lastlocation").show();
            }
            else {
                $("#lastlocation").hide();
            }

            // Hide the on shelter flags if the animal is off the shelter
            if (controller.animal.ARCHIVED == 1 && controller.animal.ACTIVEMOVEMENTTYPE != 2 && controller.animal.NONSHELTERANIMAL == 0) {
                $("#onshelterflags").hide();
            }

            // If the animal is non-shelter, don't show the location, 
            // transfer/pickup, brought in by owner, bonded with, reasons or asilomar
            if ($("#flags option[value='nonshelter']").is(":selected")) {
                $("#lastlocation").hide();
                $("#locationrow").hide();
                $("#locationunitrow").hide();
                $("#transferinrow").hide();
                $("#pickeduprow").hide();
                $("#holdrow").hide();
                $("#broughtinbyownerrow").hide();
                $("#originalownerrow td").removeClass("bottomborder");
                $("#bondedwith1row").hide();
                $("#bondedwith2row").hide();
                $("#entryreasonrow").hide();
                $("#reasonforentryrow").hide();
                $("#reasonnotfromownerrow").hide();
                $(".asilomar").hide();
            }

            // CONFIG ===========================

            if (config.bool("DisableShortCodesControl")) {
                $("#shortcode").hide();
                $("#sheltercode").addClass("asm-textbox");
                $("#sheltercode").removeClass("asm-halftextbox");
            }

            if (config.bool("LockCodes") && common.current_url().indexOf("cloned=true") == -1) {
                $("#button-gencode").hide();
                $("#sheltercode").textbox("disable");
                $("#shortcode").textbox("disable");
                // Lock any fields used in the coding format
                if (config.str("CodingFormat").indexOf("T") != -1 || 
                    config.str("ShortCodingFormat").indexOf("T") != -1) {
                    $("#animaltype").select("disable");
                }
                if (config.str("CodingFormat").indexOf("Y") != -1 ||
                    config.str("CodingFormat").indexOf("M") != -1 ||
                    config.str("ShortCodingFormat").indexOf("Y") != -1 ||
                    config.str("ShortCodingFormat").indexOf("M") != -1) {
                    $("#datebroughtin").textbox("disable");
                    $("#timebroughtin").textbox("disable");
                }
                if (config.str("CodingFormat").indexOf("S") != -1 || 
                    config.str("ShortCodingFormat").indexOf("S") != -1) {
                    $("#species").select("disable");
                }
                if (config.str("CodingFormat").indexOf("E") != -1 || 
                    config.str("ShortCodingFormat").indexOf("E") != -1) {
                    $("#entryreason").select("disable");
                }
            }

            // Converting between whole number for weight and pounds and ounces
            var lboz_to_fraction = function() {
                var lb = format.to_int($("#weightlb").val());
                lb += format.to_int($("#weightoz").val()) / 16.0;
                $("#weight").val(String(lb));
            };

            var fraction_to_lboz = function() {
                var kg = format.to_float($("#weight").val()),
                    lb = format.to_int($("#weight").val()),
                    oz = (kg - lb) * 16.0;
                $("#weightlb").val(lb);
                $("#weightoz").val(oz);
            };

            if (config.bool("ShowWeightInLbs")) {
                $("#kilosrow").hide();
                $("#poundsrow").show();
                $("#weightlb, #weightoz").change(lboz_to_fraction);
                fraction_to_lboz();
            }
            else {
                $("#kilosrow").show();
                $("#poundsrow").hide();
            }

            if (config.bool("DontShowLitterID")) { $("#litteridrow").hide(); }
            if (config.bool("DontShowLocationUnit")) { $("#locationunitrow").hide(); }
            if (config.bool("DontShowRabies")) { $("#rabiestag, label[for='rabiestag']").hide(); }
            if (config.bool("UseSingleBreedField")) { $("#secondbreedrow").hide(); }
            if (config.bool("DontShowAdoptionFee")) { $("#feerow").hide(); }
            if (config.bool("DontShowCoatType")) { $("#coattyperow").hide(); }
            if (config.bool("DontShowSize")) { $("#sizerow").hide(); }
            if (config.bool("DontShowWeight")) { $("#kilosrow, #poundsrow").hide(); }
            if (config.bool("DontShowMicrochip")) { $("#microchiprow").hide(); }
            if (config.bool("DontShowTattoo")) { $("#tattoorow").hide(); }
            if (config.str("SmartTagFTPURL") == "") { $("#smarttagrow").hide(); }
            if (config.bool("DontShowBonded")) { $("#bondedwith1row").hide(); }
            if (config.bool("DontShowBonded")) { $("#bondedwith2row").hide(); }
            if (config.bool("DontShowPickup")) { $("#pickeduprow").hide(); }
            if (config.bool("DontShowPickup")) { $("#pickuplocationrow").hide(); }
            if (config.bool("DontShowPickup")) { $("#pickedupbyrow").hide(); }
            if (config.bool("DontShowNeutered")) { $("#neuteredrow").hide(); }
            if (config.bool("DontShowDeclawed")) { $("#declawed").closest("tr").hide(); }
            if (config.bool("DontShowGoodWith")) { $(".goodwith").hide(); }
            if (config.bool("DontShowCombi")) { $("#fivlrow").hide(); }
            if (config.bool("DontShowHeartworm")) { $("#heartwormrow").hide(); }
            if (config.bool("DisableLostAndFound")) { $("#button-match").hide(); }
            if (config.bool("ManualCodes")) { $("#button-gencode").hide(); }
            if (!config.bool("AddAnimalsShowTimeBroughtIn")) { $("#timebroughtinrow").hide(); }

            // SECURITY =============================================================

            if (!common.has_permission("ca")) { $("#button-save").hide(); }
            if (!common.has_permission("aa")) { $("#button-clone").hide(); }
            if (!common.has_permission("da")) { $("#button-delete").hide(); }
            if (!common.has_permission("gaf")) { $("#button-document").hide(); }
            if (!common.has_permission("vo")) { $("#button-currentowner").hide(); }
            if (!common.has_permission("mlaf")) { $("#button-match").hide(); }
            if (!common.has_permission("vll")) { $("#button-littermates").hide(); }
            if (!common.has_permission("uipb")) { $("#button-share").hide(); }

            // ACCORDION ICONS =======================================================

            // A value in health problems or special needs being checked flags health/id tab
            if ($("#healthproblems").val() != "" || $("#specialneeds").is(":checked")) {
                $("#tabhealth").show();
            }
            else {
                $("#tabhealth").hide();
            }

            // A deceased date being completed flags Death tab
            if ($("#deceaseddate").val() != "") {
                $("#tabdeath").show();
            }
            else {
                $("#tabdeath").hide();
            }

        },

        show_microchip_supplier: function() {
            var m, 
                n = $("#microchipnumber").val();
            if (!n) { 
                $("#microchipbrand").fadeOut();
                return;
            }
            $.each(controller.microchipmanufacturers, function(i, v) {
                if (n.length == v.length && new RegExp(v.regex).test(n)) {
                    if (v.locales == "" || $.inArray(asm.locale, v.locales.split(" ")) != -1) {
                        m = "<span style='font-weight: bold'>" + v.name + "</span>";
                        return false;
                    }
                }
            });
            if (!m && (n.length != 9 && n.length != 10 && n.length != 15)) {
                m = "<span style='font-weight: bold; color: red'>" + _("Invalid microchip number length") + "</span>";
            }
            if (!m) {
                m = "<span style='font-weight: bold; color: red'>" + _("Unknown microchip brand") + "</span>";
            }
            $("#microchipbrand").html(m);
            $("#microchipbrand").fadeIn();
        },

        /** Validates the form fields prior to saving */
        validation: function() {

            // Remove any previous errors
            header.hide_error();
            validate.reset();

            // name
            if ($.trim($("#animalname").val()) == "") {
                header.show_error(_("Name cannot be blank"));
                $("#asm-details-accordion").accordion("option", "active", 0);
                validate.highlight("animalname");
                return false;
            }

            // date brought in
            if ($.trim($("#datebroughtin").val()) == "") {
                header.show_error(_("Date brought in cannot be blank"));
                $("#asm-details-accordion").accordion("option", "active", 3);
                validate.highlight("datebroughtin");
                return false;
            }

            // date of birth
            if ($.trim($("#dateofbirth").val()) == "") {
                header.show_error(_("Date of birth cannot be blank"));
                $("#asm-details-accordion").accordion("option", "active", 0);
                validate.highlight("dateofbirth");
                return false;
            }

            // shelter code
            if ($.trim($("#sheltercode").val()) == "") {
                header.show_error(_("Shelter code cannot be blank"));
                $("#asm-details-accordion").accordion("option", "active", 0);
                validate.highlight("sheltercode");
                return false;
            }

            // any additional fields that are marked mandatory
            if (!additional.validate_mandatory()) {
                return false;
            }

            return true;
        },

        /** Generates a new animal code */
        generate_code: function() {
            validate.dirty(false);
            var formdata = "mode=gencode&datebroughtin=" + $("#datebroughtin").val() + 
                "&animaltypeid=" + $("#animaltype").val() +
                "&entryreasonid=" + $("#entryreason").val() +
                "&speciesid=" + $("#species").val();
            common.ajax_post("animal", formdata)
                .then(function(result) { 
                    var codes = result.split("||");
                    $("#sheltercode").val(html.decode(codes[0]));
                    $("#shortcode").val(html.decode(codes[1]));
                    $("#uniquecode").val(codes[2]);
                    $("#yearcode").val(codes[3]);
                    validate.dirty(true);
                });
        },

        /**
         * Generates the sharing links/share button
         */
        set_sharinglinks: function() {

            // Share data
            var share_url = asm.serviceurl + "?method=animal_view&animalid=" + controller.animal.ID;
            var share_image = asm.serviceurl + "?method=animal_image&animalid=" + controller.animal.ID;
            if (asm.smcom) { share_url += "&account=" + asm.useraccount; share_image += "&account=" + asm.useraccount; }
            var share_title = controller.animal.ANIMALNAME;
            var share_description = controller.animal.WEBSITEMEDIANOTES;

            if (config.bool("PublisherUseComments") || !share_description) {
                share_description = controller.animal.ANIMALCOMMENTS;
            }

            // Enable sharing according to sitedef
            $(".sharebutton").hide();
            $.each(controller.sharebutton.split(","), function(i, v) {
                $("#button-" + v).show();
            });

            // When a share button is clicked, mark it as such for the publishing history
            $("#button-share-body").on("click", "li", function() {
                var service = $(this).attr("id").replace("button-", "");
                common.ajax_post("animal", "mode=shared&id=" + controller.animal.ID + "&service=" + service);
            });

            // Web and email
            $("#button-shareweb a").attr("href", share_url);
            $("#button-shareemail a").attr("href", "mailto:?body=" + encodeURIComponent(share_url));

            // Facebook
            $("#button-facebook a").attr("href", "https://facebook.com/sharer/sharer.php?" +
                "&u=" + encodeURIComponent(share_url));

            // Twitter
            $("#button-twitter a").attr("href", "https://twitter.com/share?" +
                "text=" + encodeURIComponent(html.truncate(share_description, 113)) + 
                "&url=" + encodeURIComponent(share_url));

            // Google Plus
            $("#button-gplus a").attr("href", "https://plus.google.com/share?" +
                "&url=" + encodeURIComponent(share_url));

            // Pinterest
            $("#button-pinterest a").attr("href", "http://pinterest.com/pin/create/button/?" +
                "url=" + encodeURIComponent(share_url) + 
                "&media=" + encodeURIComponent(share_image) +
                "&description=" + encodeURIComponent(html.truncate(share_description, 120)));

            // Tumblr
            $("#button-tumblr a").attr("href", "http://www.tumblr.com/share/link?" +
                "url=" + encodeURIComponent(share_url) +
                "&name=" + encodeURIComponent(share_title) +
                "&description=" + encodeURIComponent(share_description));

        },

        /**
         * Bind widgets and control events
         */
        bind: function() {

            // Setup the document/diary task/social menu buttons
            $("#button-diarytask, #button-document, #button-share").asmmenu();

            // If the option isn't set to allow alphanumeric/space
            // characters in microchip and ntattoo numbers, use
            // the alphanumberbox widget.
            if (!config.bool("AllowNonANMicrochip")) {
                $("#microchipnumber").alphanumber();
                $("#tattoonumber").alphanumber();
            }

            // Load the tab strip
            $(".asm-tabbar").asmtabs();

            // Changing the species updates the breed list
            $('#species').change(function() {
                animal.update_breed_list();
            });

            // Changing the location updates the unit autocomplete
            $('#location').change(function() {
                animal.update_units();
            });

            // accordion
            $("#asm-details-accordion").accordion({
                heightStyle: "content"
            });

            // Keep breed2 in sync with breed1 for non-crossbreeds
            $("#breed1").change(function() {
                if (!$("#crossbreed").is(":checked")) {
                    $("#breed2").select("value", $("#breed1").select("value"));
                }
            });

            // If the microchip number changes, lookup the manufacturer and
            // display it
            $("#microchipnumber").change(animal.show_microchip_supplier);

            additional.relocate_fields();

            // If the animal type changes, or the date brought in, we may need to
            // generate a new code
            $("#animaltype").change(function() {
                if (config.bool("ManualCodes")) { 
                    return;
                }
                if (config.str("CodingFormat").indexOf("T") != -1 || 
                    config.str("ShortCodingFormat").indexOf("T") != -1) {
                    animal.generate_code();
                }
            });
            $("#datebroughtin").change(function() {
                if (config.bool("ManualCodes")) { 
                    return;
                }
                if (config.str("CodingFormat").indexOf("Y") != -1 ||
                    config.str("CodingFormat").indexOf("M") != -1 ||
                    config.str("ShortCodingFormat").indexOf("Y") != -1 ||
                    config.str("ShortCodingFormat").indexOf("M") != -1) {
                    animal.generate_code();
                }
            });

            // Litter autocomplete
            $("#litterid").autocomplete({source: html.decode(controller.activelitters)});

            // Diary task create ajax call
            var create_task = function(taskid) {
                var formdata = "mode=exec&id=" + controller.animal.ID + "&tasktype=ANIMAL&taskid=" + taskid + "&seldate=" + $("#seldate").val();
                common.ajax_post("diarytask", formdata)
                    .then(function(result) { 
                        common.route("animal_diary?id=" + controller.animal.ID);
                    });
            };

            // Attach handlers for diary tasks
            $(".diarytask").each(function() {
                var a = $(this);
                var task = a.attr("data").split(" ");
                var taskmode = task[0];
                var taskid = task[1];
                var taskneeddate = task[2];
                $(this).click(function() {
                    $("#seldate").val("");
                    // If the task needs a date, prompt for it
                    if (taskneeddate == "1") {
                        $("#diarytaskid").val(taskid);
                        tableform.show_okcancel_dialog("#dialog-dt-date", _("Select"), { notblank: [ "seldate" ]})
                            .then(function() {
                                create_task($("#diarytaskid").val());
                            });
                    }
                    else {
                        // No need for anything else, go create the task
                        create_task(taskid);
                    }
                    return false;
                });
            });

            // If the bonded animals are cleared (or any animalchooser as part
            // of an additional field for that matter), dirty the form.
            $(".asm-animalchooser").animalchooser().bind("animalchoosercleared", function(event, rec) {
                validate.dirty(true);
            });

            // Same goes for any of our person choosers
            $(".asm-personchooser").personchooser().bind("personchoosercleared", function(event, rec) {
                validate.dirty(true);
            });

            // If the deceased date is changed and now has a value, check to see if the
            // animal is off shelter and helpfully tick the died off shelter box
            $("#deceaseddate").change(function(e) {
                if ($("#deceaseddate").val()) {
                    if (controller.animal.ARCHIVED == 1)  {
                        $("#diedoffshelter").prop("checked", true);
                    }
                }
            });

            // Controls that update the screen when changed
            $("#microchipped").click(animal.enable_widgets).keyup(animal.enable_widgets);
            $("#tattoo").click(animal.enable_widgets).keyup(animal.enable_widgets);
            $("#smarttag").click(animal.enable_widgets).keyup(animal.enable_widgets);
            $("#neutered").click(animal.enable_widgets).keyup(animal.enable_widgets);
            $("#fivltested").click(animal.enable_widgets).keyup(animal.enable_widgets);
            $("#heartwormtested").click(animal.enable_widgets).keyup(animal.enable_widgets);
            $("#hold").click(animal.enable_widgets).keyup(animal.enable_widgets);
            $("#deceaseddate").change(animal.enable_widgets);
            $("#healthproblems").change(animal.enable_widgets);
            $("#specialneeds").change(animal.enable_widgets);
            $("#litterid").keyup(animal.enable_widgets);
            $("#microchipnumber").keyup(animal.enable_widgets);
            $("#microchipdate").change(animal.enable_widgets);
            $("#pickedup").click(animal.enable_widgets).keyup(animal.enable_widgets);

            validate.save = function(callback) {
                if (!animal.validation()) { header.hide_loading(); return; }
                validate.dirty(false);
                var formdata = "mode=save" +
                    "&id=" + controller.animal.ID + 
                    "&recordversion=" + controller.animal.RECORDVERSION + 
                    "&" + $("input, select, textarea").toPOST();
                common.ajax_post("animal", formdata)
                    .then(callback)
                    .fail(function() {
                        validate.dirty(true); 
                    });
            };

            // Toolbar buttons
            $("#button-save").button().click(function() {
                header.show_loading(_("Saving..."));
                validate.save(function() {
                    common.route_reload();
                });
            });

            $("#button-clone").button().click(function() {
                $("#button-clone").button("disable");
                var formdata = "mode=clone&animalid=" + $("#animalid").val();
                common.ajax_post("animal", formdata)
                    .then(function(result) { 
                        common.route("animal?id=" + result + "&cloned=true"); 
                    });
            });

            $("#button-delete").button().click(function() {
                tableform.delete_dialog(null, _("This will permanently remove this animal, are you sure?"))
                    .then(function() {
                        var formdata = "mode=delete&animalid=" + $("#animalid").val();
                        return common.ajax_post("animal", formdata);
                    })
                    .then(function() { 
                        common.route("main");
                    });
            });

            $("#button-match").button().click(function() {
                common.route("lostfound_match?animalid=" + $("#animalid").val());
            });

            $("#button-littermates").button().click(function() {
                common.route("animal_find_results?mode=ADVANCED&q=&litterid=" + $("#litterid").val());
            });

            // Inline buttons
            $("#button-gencode")
                .button({ icons: { primary: "ui-icon-refresh" }, text: false })
                .click(animal.generate_code);

            $("#button-randomname")
                .button({ icons: { primary: "ui-icon-tag" }, text: false })
                .click(function() {
                validate.dirty(false);
                var formdata = "mode=randomname&sex=" + $("#sex").val();
                common.ajax_post("animal", formdata)
                    .then(function(result) { 
                        $("#animalname").val(result);
                        validate.dirty(true);
                    });
            });

            $("#button-commentstomedia")
                .hide()
                .button({ icons: { primary: "ui-icon-arrow-1-ne" }, text: false })
                .click(function() {
                $("#button-commentstomedia").button("disable");
                var formdata = "mode=webnotes&id=" + $("#animalid").val() + "&" + $("#comments").toPOST();
                common.ajax_post("animal", formdata)
                    .then(function(result) { 
                        $("#button-commentstomedia").button("enable");
                        header.show_info(_("Comments copied to web preferred media."));
                    });
            });

            // Events that trigger rechecking of the on-screen fields
            $("#crossbreed").click(function() {
                animal.enable_widgets();
            });

        },

        sync: function() {

            // Load the data into the controls for the screen
            $("#asm-content input, #asm-content select, #asm-content textarea").fromJSON(controller.animal);

            // Update the breeds to match the species we just loaded and reload the breed values
            animal.update_breed_list();
            $("#breed1, #breed2").fromJSON(controller.animal);

            // Load animal flags
            html.animal_flag_options(controller.animal, controller.flags, $("#flags"));

            // Update the unit autocomplete to match the selected location
            animal.update_units();

            // Update on-screen fields from the data and display the screen
            animal.enable_widgets();
            animal.show_microchip_supplier();

            // Share button/links
            animal.set_sharinglinks();

            // Dirty handling
            validate.bind_dirty([ "animal_" ]);

        },

        destroy: function() {
            validate.unbind_dirty();
            common.widget_destroy("#dialog-dt-date");
            common.widget_destroy("#bonded1", "animalchooser");
            common.widget_destroy("#bonded2", "animalchooser");
            common.widget_destroy("#originalowner", "personchooser");
            common.widget_destroy("#broughtinby", "personchooser");
            common.widget_destroy("#pickedupby", "personchooser");
            common.widget_destroy("#currentvet", "personchooser");
            common.widget_destroy("#ownersvet", "personchooser");
        },

        name: "animal",
        animation: "formtab",
        autofocus: "#animalname", 
        title:  function() { return common.substitute(_("{0} - {1} ({2} {3} aged {4})"), { 
            0: controller.animal.ANIMALNAME, 1: controller.animal.CODE, 2: controller.animal.SEXNAME,
            3: controller.animal.SPECIESNAME, 4: controller.animal.ANIMALAGE }); },

        routes: {
            "animal": function() {
                common.module_loadandstart("animal", "animal?id=" + this.qs.id);
            }
        }

    };
    
    common.module_register(animal);

});

