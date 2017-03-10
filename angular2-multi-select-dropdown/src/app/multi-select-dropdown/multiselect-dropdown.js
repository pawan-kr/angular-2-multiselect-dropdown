/*
 * Angular 2 Dropdown Multiselect for Bootstrap
 *
 * Simon Lindh
 * https://github.com/softsimon/angular-2-dropdown-multiselect
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var MULTISELECT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MultiselectDropdown; }),
    multi: true
};
var MultiSelectSearchFilter = (function () {
    function MultiSelectSearchFilter() {
    }
    MultiSelectSearchFilter.prototype.transform = function (options, args) {
        return options.filter(function (option) {
            return option.name
                .toLowerCase()
                .indexOf((args || '').toLowerCase()) > -1;
        });
    };
    return MultiSelectSearchFilter;
}());
MultiSelectSearchFilter = __decorate([
    core_1.Pipe({
        name: 'searchFilter'
    })
], MultiSelectSearchFilter);
exports.MultiSelectSearchFilter = MultiSelectSearchFilter;
var MultiselectDropdown = (function () {
    function MultiselectDropdown(element, differs) {
        this.element = element;
        this.differs = differs;
        this.selectionLimitReached = new core_1.EventEmitter();
        this.dropdownClosed = new core_1.EventEmitter();
        this.numSelected = 0;
        this.isVisible = false;
        this.searchFilterText = '';
        this.defaultSettings = {
            pullRight: false,
            enableSearch: false,
            checkedStyle: 'checkboxes',
            buttonClasses: 'btn btn-default btn-secondary',
            selectionLimit: 0,
            closeOnSelect: false,
            autoUnselect: false,
            showCheckAll: false,
            showUncheckAll: false,
            dynamicTitleMaxItems: 3,
            maxHeight: '300px',
        };
        this.defaultTexts = {
            checkAll: 'Check all',
            uncheckAll: 'Uncheck all',
            checked: 'checked',
            checkedPlural: 'checked',
            searchPlaceholder: 'Search...',
            defaultTitle: 'Select',
        };
        this.onModelChange = function (_) { };
        this.onModelTouched = function () { };
        this.differ = differs.find([]).create(null);
    }
    MultiselectDropdown.prototype.onClick = function (target) {
        var parentFound = false;
        while (target != null && !parentFound) {
            if (target === this.element.nativeElement) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        if (!parentFound) {
            this.isVisible = false;
        }
    };
    MultiselectDropdown.prototype.ngOnInit = function () {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
        this.title = this.texts.defaultTitle;
    };
    MultiselectDropdown.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.model = value;
        }
    };
    MultiselectDropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    MultiselectDropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    MultiselectDropdown.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    };
    MultiselectDropdown.prototype.clearSearch = function () {
        this.searchFilterText = '';
    };
    MultiselectDropdown.prototype.toggleDropdown = function () {
        this.isVisible = !this.isVisible;
        if (!this.isVisible) {
            this.dropdownClosed.emit();
        }
    };
    MultiselectDropdown.prototype.isSelected = function (option) {
        return this.model && this.model.indexOf(option.id) > -1;
    };
    MultiselectDropdown.prototype.setSelected = function (event, option) {
        if (!this.model) {
            this.model = [];
        }
        var index = this.model.indexOf(option.id);
        if (index > -1) {
            this.model.splice(index, 1);
        }
        else {
            if (this.settings.selectionLimit === 0 || this.model.length < this.settings.selectionLimit) {
                this.model.push(option.id);
            }
            else {
                if (this.settings.autoUnselect) {
                    this.model.push(option.id);
                    this.model.shift();
                }
                else {
                    this.selectionLimitReached.emit(this.model.length);
                    return;
                }
            }
        }
        if (this.settings.closeOnSelect) {
            this.toggleDropdown();
        }
        this.onModelChange(this.model);
    };
    MultiselectDropdown.prototype.updateNumSelected = function () {
        this.numSelected = this.model && this.model.length || 0;
    };
    MultiselectDropdown.prototype.updateTitle = function () {
        var _this = this;
        if (this.numSelected === 0) {
            this.title = this.texts.defaultTitle;
        }
        else if (this.settings.dynamicTitleMaxItems >= this.numSelected) {
            this.title = this.options
                .filter(function (option) {
                return _this.model && _this.model.indexOf(option.id) > -1;
            })
                .map(function (option) { return option.name; })
                .join(', ');
        }
        else {
            this.title = this.numSelected
                + ' '
                + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
        }
    };
    MultiselectDropdown.prototype.checkAll = function () {
        this.model = this.options.map(function (option) { return option.id; });
        this.onModelChange(this.model);
    };
    MultiselectDropdown.prototype.uncheckAll = function () {
        this.model = [];
        this.onModelChange(this.model);
    };
    return MultiselectDropdown;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MultiselectDropdown.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultiselectDropdown.prototype, "settings", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultiselectDropdown.prototype, "texts", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MultiselectDropdown.prototype, "selectionLimitReached", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MultiselectDropdown.prototype, "dropdownClosed", void 0);
__decorate([
    core_1.HostListener('document: click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLElement]),
    __metadata("design:returntype", void 0)
], MultiselectDropdown.prototype, "onClick", null);
MultiselectDropdown = __decorate([
    core_1.Component({
        selector: 'ss-multiselect-dropdown',
        providers: [MULTISELECT_VALUE_ACCESSOR],
        styles: ["\n\t   a { outline: none !important; }\n  "],
        template: "\n\t<div class=\"dropdown\">\n\t    <button type=\"button\" class=\"dropdown-toggle\" [ngClass]=\"settings.buttonClasses\"\n\t    (click)=\"toggleDropdown()\">{{ title }}&nbsp;<span class=\"caret\"></span></button>\n\t    <ul *ngIf=\"isVisible\" class=\"dropdown-menu\" [class.pull-right]=\"settings.pullRight\" [class.dropdown-menu-right]=\"settings.pullRight\"\n\t    [style.max-height]=\"settings.maxHeight\" style=\"display: block; height: auto; overflow-y: auto;\">\n\t\t<li class=\"dropdown-item\" *ngIf=\"settings.enableSearch\">\n\t\t    <div class=\"input-group input-group-sm\">\n\t\t\t<span class=\"input-group-addon\" id=\"sizing-addon3\"><i class=\"fa fa-search\"></i></span>\n\t\t\t<input type=\"text\" class=\"form-control\" placeholder=\"{{ texts.searchPlaceholder }}\"\n\t\t\taria-describedby=\"sizing-addon3\" [(ngModel)]=\"searchFilterText\">\n\t\t\t<span class=\"input-group-btn\" *ngIf=\"searchFilterText.length > 0\">\n\t\t\t    <button class=\"btn btn-default\" type=\"button\" (click)=\"clearSearch()\"><i class=\"fa fa-times\"></i></button>\n\t\t\t</span>\n\t\t    </div>\n\t\t</li>\n\t\t<li class=\"dropdown-divider divider\" *ngIf=\"settings.enableSearch\"></li>\n\t\t<li class=\"dropdown-item\" *ngIf=\"settings.showCheckAll\">\n\t\t    <a href=\"javascript:;\" role=\"menuitem\" tabindex=\"-1\" (click)=\"checkAll()\">\n\t\t\t<span style=\"width: 16px;\" class=\"glyphicon glyphicon-ok\"></span>\n\t\t\t{{ texts.checkAll }}\n\t\t    </a>\n\t\t</li>\n\t\t<li class=\"dropdown-item\" *ngIf=\"settings.showUncheckAll\">\n\t\t    <a href=\"javascript:;\" role=\"menuitem\" tabindex=\"-1\" (click)=\"uncheckAll()\">\n\t\t\t<span style=\"width: 16px;\" class=\"glyphicon glyphicon-remove\"></span>\n\t\t\t{{ texts.uncheckAll }}\n\t\t    </a>\n\t\t</li>\n\t\t<li *ngIf=\"settings.showCheckAll || settings.showUncheckAll\" class=\"dropdown-divider divider\"></li>\n\t\t<li class=\"dropdown-item\" style=\"cursor: pointer;\"  *ngFor=\"let option of options | searchFilter:searchFilterText\" (click)=\"setSelected($event, option)\">\n\t\t    <a href=\"javascript:;\" role=\"menuitem\" tabindex=\"-1\">\n\t\t\t<input *ngIf=\"settings.checkedStyle === 'checkboxes'\" type=\"checkbox\" [checked]=\"isSelected(option)\" />\n\t\t\t<span *ngIf=\"settings.checkedStyle === 'glyphicon'\" style=\"width: 16px;\"\n\t\t\tclass=\"glyphicon\" [class.glyphicon-ok]=\"isSelected(option)\"></span>\n\t\t\t<span *ngIf=\"settings.checkedStyle === 'fontawsome'\" style=\"width: 16px;display: inline-block;\">\n\t\t\t    <i *ngIf=\"isSelected(option)\" class=\"fa fa-check\" aria-hidden=\"true\"></i>\n\t\t\t</span>\n\t\t\t{{ option.name }}\n\t\t    </a>\n\t\t</li>\n\t    </ul>\n\t</div>\n"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object, typeof (_b = typeof core_1.IterableDiffers !== "undefined" && core_1.IterableDiffers) === "function" && _b || Object])
], MultiselectDropdown);
exports.MultiselectDropdown = MultiselectDropdown;
var MultiselectDropdownModule = (function () {
    function MultiselectDropdownModule() {
    }
    return MultiselectDropdownModule;
}());
MultiselectDropdownModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule],
        exports: [MultiselectDropdown],
        declarations: [MultiselectDropdown, MultiSelectSearchFilter],
    })
], MultiselectDropdownModule);
exports.MultiselectDropdownModule = MultiselectDropdownModule;
var _a, _b;
//# sourceMappingURL=multiselect-dropdown.js.map