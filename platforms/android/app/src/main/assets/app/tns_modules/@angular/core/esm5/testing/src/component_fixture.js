/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RendererFactory2, getDebugNode } from '@angular/core';
/**
 * Fixture for debugging and testing a component.
 *
 *
 */
var ComponentFixture = /** @class */ (function () {
    function ComponentFixture(componentRef, ngZone, _autoDetect) {
        var _this = this;
        this.componentRef = componentRef;
        this.ngZone = ngZone;
        this._autoDetect = _autoDetect;
        this._isStable = true;
        this._isDestroyed = false;
        this._resolve = null;
        this._promise = null;
        this._onUnstableSubscription = null;
        this._onStableSubscription = null;
        this._onMicrotaskEmptySubscription = null;
        this._onErrorSubscription = null;
        this.changeDetectorRef = componentRef.changeDetectorRef;
        this.elementRef = componentRef.location;
        this.debugElement = getDebugNode(this.elementRef.nativeElement);
        this.componentInstance = componentRef.instance;
        this.nativeElement = this.elementRef.nativeElement;
        this.componentRef = componentRef;
        this.ngZone = ngZone;
        if (ngZone) {
            // Create subscriptions outside the NgZone so that the callbacks run oustide
            // of NgZone.
            ngZone.runOutsideAngular(function () {
                _this._onUnstableSubscription =
                    ngZone.onUnstable.subscribe({ next: function () { _this._isStable = false; } });
                _this._onMicrotaskEmptySubscription = ngZone.onMicrotaskEmpty.subscribe({
                    next: function () {
                        if (_this._autoDetect) {
                            // Do a change detection run with checkNoChanges set to true to check
                            // there are no changes on the second run.
                            _this.detectChanges(true);
                        }
                    }
                });
                _this._onStableSubscription = ngZone.onStable.subscribe({
                    next: function () {
                        _this._isStable = true;
                        // Check whether there is a pending whenStable() completer to resolve.
                        if (_this._promise !== null) {
                            // If so check whether there are no pending macrotasks before resolving.
                            // Do this check in the next tick so that ngZone gets a chance to update the state of
                            // pending macrotasks.
                            scheduleMicroTask(function () {
                                if (!ngZone.hasPendingMacrotasks) {
                                    if (_this._promise !== null) {
                                        _this._resolve(true);
                                        _this._resolve = null;
                                        _this._promise = null;
                                    }
                                }
                            });
                        }
                    }
                });
                _this._onErrorSubscription =
                    ngZone.onError.subscribe({ next: function (error) { throw error; } });
            });
        }
    }
    ComponentFixture.prototype._tick = function (checkNoChanges) {
        this.changeDetectorRef.detectChanges();
        if (checkNoChanges) {
            this.checkNoChanges();
        }
    };
    /**
     * Trigger a change detection cycle for the component.
     */
    ComponentFixture.prototype.detectChanges = function (checkNoChanges) {
        var _this = this;
        if (checkNoChanges === void 0) { checkNoChanges = true; }
        if (this.ngZone != null) {
            // Run the change detection inside the NgZone so that any async tasks as part of the change
            // detection are captured by the zone and can be waited for in isStable.
            this.ngZone.run(function () { _this._tick(checkNoChanges); });
        }
        else {
            // Running without zone. Just do the change detection.
            this._tick(checkNoChanges);
        }
    };
    /**
     * Do a change detection run to make sure there were no changes.
     */
    ComponentFixture.prototype.checkNoChanges = function () { this.changeDetectorRef.checkNoChanges(); };
    /**
     * Set whether the fixture should autodetect changes.
     *
     * Also runs detectChanges once so that any existing change is detected.
     */
    ComponentFixture.prototype.autoDetectChanges = function (autoDetect) {
        if (autoDetect === void 0) { autoDetect = true; }
        if (this.ngZone == null) {
            throw new Error('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set');
        }
        this._autoDetect = autoDetect;
        this.detectChanges();
    };
    /**
     * Return whether the fixture is currently stable or has async tasks that have not been completed
     * yet.
     */
    ComponentFixture.prototype.isStable = function () { return this._isStable && !this.ngZone.hasPendingMacrotasks; };
    /**
     * Get a promise that resolves when the fixture is stable.
     *
     * This can be used to resume testing after events have triggered asynchronous activity or
     * asynchronous change detection.
     */
    ComponentFixture.prototype.whenStable = function () {
        var _this = this;
        if (this.isStable()) {
            return Promise.resolve(false);
        }
        else if (this._promise !== null) {
            return this._promise;
        }
        else {
            this._promise = new Promise(function (res) { _this._resolve = res; });
            return this._promise;
        }
    };
    ComponentFixture.prototype._getRenderer = function () {
        if (this._renderer === undefined) {
            this._renderer = this.componentRef.injector.get(RendererFactory2, null);
        }
        return this._renderer;
    };
    /**
      * Get a promise that resolves when the ui state is stable following animations.
      */
    ComponentFixture.prototype.whenRenderingDone = function () {
        var renderer = this._getRenderer();
        if (renderer && renderer.whenRenderingDone) {
            return renderer.whenRenderingDone();
        }
        return this.whenStable();
    };
    /**
     * Trigger component destruction.
     */
    ComponentFixture.prototype.destroy = function () {
        if (!this._isDestroyed) {
            this.componentRef.destroy();
            if (this._onUnstableSubscription != null) {
                this._onUnstableSubscription.unsubscribe();
                this._onUnstableSubscription = null;
            }
            if (this._onStableSubscription != null) {
                this._onStableSubscription.unsubscribe();
                this._onStableSubscription = null;
            }
            if (this._onMicrotaskEmptySubscription != null) {
                this._onMicrotaskEmptySubscription.unsubscribe();
                this._onMicrotaskEmptySubscription = null;
            }
            if (this._onErrorSubscription != null) {
                this._onErrorSubscription.unsubscribe();
                this._onErrorSubscription = null;
            }
            this._isDestroyed = true;
        }
    };
    return ComponentFixture;
}());
export { ComponentFixture };
function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50X2ZpeHR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL2NvbXBvbmVudF9maXh0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBb0UsZ0JBQWdCLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR2hJOzs7O0dBSUc7QUFDSDtJQW9DRSwwQkFDVyxZQUE2QixFQUFTLE1BQW1CLEVBQ3hELFdBQW9CO1FBRmhDLGlCQW1EQztRQWxEVSxpQkFBWSxHQUFaLFlBQVksQ0FBaUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFhO1FBQ3hELGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBWHhCLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsYUFBUSxHQUFpQyxJQUFJLENBQUM7UUFDOUMsYUFBUSxHQUFzQixJQUFJLENBQUM7UUFDbkMsNEJBQXVCLEdBQTBCLElBQUksQ0FBQztRQUN0RCwwQkFBcUIsR0FBMEIsSUFBSSxDQUFDO1FBQ3BELGtDQUE2QixHQUEwQixJQUFJLENBQUM7UUFDNUQseUJBQW9CLEdBQTBCLElBQUksQ0FBQztRQUt6RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLGlCQUFpQixDQUFDO1FBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFpQixZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUMvQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQ25ELElB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LENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLDZCQUE2QixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNqRCxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO1lBQzVDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1lBQ25DLENBQUM7WUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQW5NRCxJQW1NQzs7QUFFRCwyQkFBMkIsRUFBWTtJQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudFJlZiwgRGVidWdFbGVtZW50LCBFbGVtZW50UmVmLCBOZ1pvbmUsIFJlbmRlcmVyRmFjdG9yeTIsIGdldERlYnVnTm9kZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuLyoqXG4gKiBGaXh0dXJlIGZvciBkZWJ1Z2dpbmcgYW5kIHRlc3RpbmcgYSBjb21wb25lbnQuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIENvbXBvbmVudEZpeHR1cmU8VD4ge1xuICAvKipcbiAgICogVGhlIERlYnVnRWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhlIHJvb3QgZWxlbWVudCBvZiB0aGlzIGNvbXBvbmVudC5cbiAgICovXG4gIGRlYnVnRWxlbWVudDogRGVidWdFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBUaGUgaW5zdGFuY2Ugb2YgdGhlIHJvb3QgY29tcG9uZW50IGNsYXNzLlxuICAgKi9cbiAgY29tcG9uZW50SW5zdGFuY2U6IFQ7XG5cbiAgLyoqXG4gICAqIFRoZSBuYXRpdmUgZWxlbWVudCBhdCB0aGUgcm9vdCBvZiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgbmF0aXZlRWxlbWVudDogYW55O1xuXG4gIC8qKlxuICAgKiBUaGUgRWxlbWVudFJlZiBmb3IgdGhlIGVsZW1lbnQgYXQgdGhlIHJvb3Qgb2YgdGhlIGNvbXBvbmVudC5cbiAgICovXG4gIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFRoZSBDaGFuZ2VEZXRlY3RvclJlZiBmb3IgdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmO1xuXG4gIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlckZhY3RvcnkyfG51bGx8dW5kZWZpbmVkO1xuICBwcml2YXRlIF9pc1N0YWJsZTogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgX2lzRGVzdHJveWVkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3Jlc29sdmU6ICgocmVzdWx0OiBhbnkpID0+IHZvaWQpfG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9wcm9taXNlOiBQcm9taXNlPGFueT58bnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX29uVW5zdGFibGVTdWJzY3JpcHRpb246IGFueSAvKiogVE9ETyAjOTEwMCAqLyA9IG51bGw7XG4gIHByaXZhdGUgX29uU3RhYmxlU3Vic2NyaXB0aW9uOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8gPSBudWxsO1xuICBwcml2YXRlIF9vbk1pY3JvdGFza0VtcHR5U3Vic2NyaXB0aW9uOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8gPSBudWxsO1xuICBwcml2YXRlIF9vbkVycm9yU3Vic2NyaXB0aW9uOiBhbnkgLyoqIFRPRE8gIzkxMDAgKi8gPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFQ+LCBwdWJsaWMgbmdab25lOiBOZ1pvbmV8bnVsbCxcbiAgICAgIHByaXZhdGUgX2F1dG9EZXRlY3Q6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmID0gY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmO1xuICAgIHRoaXMuZWxlbWVudFJlZiA9IGNvbXBvbmVudFJlZi5sb2NhdGlvbjtcbiAgICB0aGlzLmRlYnVnRWxlbWVudCA9IDxEZWJ1Z0VsZW1lbnQ+Z2V0RGVidWdOb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICB0aGlzLmNvbXBvbmVudEluc3RhbmNlID0gY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIHRoaXMubmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuY29tcG9uZW50UmVmID0gY29tcG9uZW50UmVmO1xuICAgIHRoaXMubmdab25lID0gbmdab25lO1xuXG4gICAgaWYgKG5nWm9uZSkge1xuICAgICAgLy8gQ3JlYXRlIHN1YnNjcmlwdGlvbnMgb3V0c2lkZSB0aGUgTmdab25lIHNvIHRoYXQgdGhlIGNhbGxiYWNrcyBydW4gb3VzdGlkZVxuICAgICAgLy8gb2YgTmdab25lLlxuICAgICAgbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5fb25VbnN0YWJsZVN1YnNjcmlwdGlvbiA9XG4gICAgICAgICAgICBuZ1pvbmUub25VbnN0YWJsZS5zdWJzY3JpYmUoe25leHQ6ICgpID0+IHsgdGhpcy5faXNTdGFibGUgPSBmYWxzZTsgfX0pO1xuICAgICAgICB0aGlzLl9vbk1pY3JvdGFza0VtcHR5U3Vic2NyaXB0aW9uID0gbmdab25lLm9uTWljcm90YXNrRW1wdHkuc3Vic2NyaWJlKHtcbiAgICAgICAgICBuZXh0OiAoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fYXV0b0RldGVjdCkge1xuICAgICAgICAgICAgICAvLyBEbyBhIGNoYW5nZSBkZXRlY3Rpb24gcnVuIHdpdGggY2hlY2tOb0NoYW5nZXMgc2V0IHRvIHRydWUgdG8gY2hlY2tcbiAgICAgICAgICAgICAgLy8gdGhlcmUgYXJlIG5vIGNoYW5nZXMgb24gdGhlIHNlY29uZCBydW4uXG4gICAgICAgICAgICAgIHRoaXMuZGV0ZWN0Q2hhbmdlcyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9vblN0YWJsZVN1YnNjcmlwdGlvbiA9IG5nWm9uZS5vblN0YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgIG5leHQ6ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2lzU3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlcmUgaXMgYSBwZW5kaW5nIHdoZW5TdGFibGUoKSBjb21wbGV0ZXIgdG8gcmVzb2x2ZS5cbiAgICAgICAgICAgIGlmICh0aGlzLl9wcm9taXNlICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIC8vIElmIHNvIGNoZWNrIHdoZXRoZXIgdGhlcmUgYXJlIG5vIHBlbmRpbmcgbWFjcm90YXNrcyBiZWZvcmUgcmVzb2x2aW5nLlxuICAgICAgICAgICAgICAvLyBEbyB0aGlzIGNoZWNrIGluIHRoZSBuZXh0IHRpY2sgc28gdGhhdCBuZ1pvbmUgZ2V0cyBhIGNoYW5jZSB0byB1cGRhdGUgdGhlIHN0YXRlIG9mXG4gICAgICAgICAgICAgIC8vIHBlbmRpbmcgbWFjcm90YXNrcy5cbiAgICAgICAgICAgICAgc2NoZWR1bGVNaWNyb1Rhc2soKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghbmdab25lLmhhc1BlbmRpbmdNYWNyb3Rhc2tzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcHJvbWlzZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvbHZlICEodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc29sdmUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fb25FcnJvclN1YnNjcmlwdGlvbiA9XG4gICAgICAgICAgICBuZ1pvbmUub25FcnJvci5zdWJzY3JpYmUoe25leHQ6IChlcnJvcjogYW55KSA9PiB7IHRocm93IGVycm9yOyB9fSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90aWNrKGNoZWNrTm9DaGFuZ2VzOiBib29sZWFuKSB7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgaWYgKGNoZWNrTm9DaGFuZ2VzKSB7XG4gICAgICB0aGlzLmNoZWNrTm9DaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYSBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlIGZvciB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgZGV0ZWN0Q2hhbmdlcyhjaGVja05vQ2hhbmdlczogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5uZ1pvbmUgIT0gbnVsbCkge1xuICAgICAgLy8gUnVuIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uIGluc2lkZSB0aGUgTmdab25lIHNvIHRoYXQgYW55IGFzeW5jIHRhc2tzIGFzIHBhcnQgb2YgdGhlIGNoYW5nZVxuICAgICAgLy8gZGV0ZWN0aW9uIGFyZSBjYXB0dXJlZCBieSB0aGUgem9uZSBhbmQgY2FuIGJlIHdhaXRlZCBmb3IgaW4gaXNTdGFibGUuXG4gICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4geyB0aGlzLl90aWNrKGNoZWNrTm9DaGFuZ2VzKTsgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJ1bm5pbmcgd2l0aG91dCB6b25lLiBKdXN0IGRvIHRoZSBjaGFuZ2UgZGV0ZWN0aW9uLlxuICAgICAgdGhpcy5fdGljayhjaGVja05vQ2hhbmdlcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERvIGEgY2hhbmdlIGRldGVjdGlvbiBydW4gdG8gbWFrZSBzdXJlIHRoZXJlIHdlcmUgbm8gY2hhbmdlcy5cbiAgICovXG4gIGNoZWNrTm9DaGFuZ2VzKCk6IHZvaWQgeyB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmNoZWNrTm9DaGFuZ2VzKCk7IH1cblxuICAvKipcbiAgICogU2V0IHdoZXRoZXIgdGhlIGZpeHR1cmUgc2hvdWxkIGF1dG9kZXRlY3QgY2hhbmdlcy5cbiAgICpcbiAgICogQWxzbyBydW5zIGRldGVjdENoYW5nZXMgb25jZSBzbyB0aGF0IGFueSBleGlzdGluZyBjaGFuZ2UgaXMgZGV0ZWN0ZWQuXG4gICAqL1xuICBhdXRvRGV0ZWN0Q2hhbmdlcyhhdXRvRGV0ZWN0OiBib29sZWFuID0gdHJ1ZSkge1xuICAgIGlmICh0aGlzLm5nWm9uZSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBjYWxsIGF1dG9EZXRlY3RDaGFuZ2VzIHdoZW4gQ29tcG9uZW50Rml4dHVyZU5vTmdab25lIGlzIHNldCcpO1xuICAgIH1cbiAgICB0aGlzLl9hdXRvRGV0ZWN0ID0gYXV0b0RldGVjdDtcbiAgICB0aGlzLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gd2hldGhlciB0aGUgZml4dHVyZSBpcyBjdXJyZW50bHkgc3RhYmxlIG9yIGhhcyBhc3luYyB0YXNrcyB0aGF0IGhhdmUgbm90IGJlZW4gY29tcGxldGVkXG4gICAqIHlldC5cbiAgICovXG4gIGlzU3RhYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faXNTdGFibGUgJiYgIXRoaXMubmdab25lICEuaGFzUGVuZGluZ01hY3JvdGFza3M7IH1cblxuICAvKipcbiAgICogR2V0IGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGZpeHR1cmUgaXMgc3RhYmxlLlxuICAgKlxuICAgKiBUaGlzIGNhbiBiZSB1c2VkIHRvIHJlc3VtZSB0ZXN0aW5nIGFmdGVyIGV2ZW50cyBoYXZlIHRyaWdnZXJlZCBhc3luY2hyb25vdXMgYWN0aXZpdHkgb3JcbiAgICogYXN5bmNocm9ub3VzIGNoYW5nZSBkZXRlY3Rpb24uXG4gICAqL1xuICB3aGVuU3RhYmxlKCk6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKHRoaXMuaXNTdGFibGUoKSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9wcm9taXNlICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlcyA9PiB7IHRoaXMuX3Jlc29sdmUgPSByZXM7IH0pO1xuICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XG4gICAgfVxuICB9XG5cblxuICBwcml2YXRlIF9nZXRSZW5kZXJlcigpIHtcbiAgICBpZiAodGhpcy5fcmVuZGVyZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIgPSB0aGlzLmNvbXBvbmVudFJlZi5pbmplY3Rvci5nZXQoUmVuZGVyZXJGYWN0b3J5MiwgbnVsbCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9yZW5kZXJlciBhcyBSZW5kZXJlckZhY3RvcnkyIHwgbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgICogR2V0IGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHVpIHN0YXRlIGlzIHN0YWJsZSBmb2xsb3dpbmcgYW5pbWF0aW9ucy5cbiAgICAqL1xuICB3aGVuUmVuZGVyaW5nRG9uZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHJlbmRlcmVyID0gdGhpcy5fZ2V0UmVuZGVyZXIoKTtcbiAgICBpZiAocmVuZGVyZXIgJiYgcmVuZGVyZXIud2hlblJlbmRlcmluZ0RvbmUpIHtcbiAgICAgIHJldHVybiByZW5kZXJlci53aGVuUmVuZGVyaW5nRG9uZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy53aGVuU3RhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBjb21wb25lbnQgZGVzdHJ1Y3Rpb24uXG4gICAqL1xuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNEZXN0cm95ZWQpIHtcbiAgICAgIHRoaXMuY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICAgIGlmICh0aGlzLl9vblVuc3RhYmxlU3Vic2NyaXB0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fb25VbnN0YWJsZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLl9vblVuc3RhYmxlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9vblN0YWJsZVN1YnNjcmlwdGlvbiAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX29uU3RhYmxlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIHRoaXMuX29uU3RhYmxlU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9vbk1pY3JvdGFza0VtcHR5U3Vic2NyaXB0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fb25NaWNyb3Rhc2tFbXB0eVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLl9vbk1pY3JvdGFza0VtcHR5U3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9vbkVycm9yU3Vic2NyaXB0aW9uICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fb25FcnJvclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB0aGlzLl9vbkVycm9yU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2lzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2NoZWR1bGVNaWNyb1Rhc2soZm46IEZ1bmN0aW9uKSB7XG4gIFpvbmUuY3VycmVudC5zY2hlZHVsZU1pY3JvVGFzaygnc2NoZWR1bGVNaWNyb3Rhc2snLCBmbik7XG59XG4iXX0=