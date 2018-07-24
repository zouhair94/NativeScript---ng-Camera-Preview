/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { areAllEquivalent } from '../output/output_ast';
import { TypeScriptEmitter } from '../output/ts_emitter';
export class GeneratedFile {
    constructor(srcFileUrl, genFileUrl, sourceOrStmts) {
        this.srcFileUrl = srcFileUrl;
        this.genFileUrl = genFileUrl;
        if (typeof sourceOrStmts === 'string') {
            this.source = sourceOrStmts;
            this.stmts = null;
        }
        else {
            this.source = null;
            this.stmts = sourceOrStmts;
        }
    }
    isEquivalent(other) {
        if (this.genFileUrl !== other.genFileUrl) {
            return false;
        }
        if (this.source) {
            return this.source === other.source;
        }
        if (other.stmts == null) {
            return false;
        }
        // Note: the constructor guarantees that if this.source is not filled,
        // then this.stmts is.
        return areAllEquivalent(this.stmts, other.stmts);
    }
}
export function toTypeScript(file, preamble = '') {
    if (!file.stmts) {
        throw new Error(`Illegal state: No stmts present on GeneratedFile ${file.genFileUrl}`);
    }
    return new TypeScriptEmitter().emitStatements(file.genFileUrl, file.stmts, preamble);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkX2ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci9zcmMvYW90L2dlbmVyYXRlZF9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBWSxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXZELE1BQU07SUFJSixZQUNXLFVBQWtCLEVBQVMsVUFBa0IsRUFBRSxhQUFpQztRQUFoRixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUN0RCxFQUFFLENBQUMsQ0FBQyxPQUFPLGFBQWEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQW9CO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3RDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxzRUFBc0U7UUFDdEUsc0JBQXNCO1FBQ3RCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFPLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLHVCQUF1QixJQUFtQixFQUFFLFdBQW1CLEVBQUU7SUFDckUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7U3RhdGVtZW50LCBhcmVBbGxFcXVpdmFsZW50fSBmcm9tICcuLi9vdXRwdXQvb3V0cHV0X2FzdCc7XG5pbXBvcnQge1R5cGVTY3JpcHRFbWl0dGVyfSBmcm9tICcuLi9vdXRwdXQvdHNfZW1pdHRlcic7XG5cbmV4cG9ydCBjbGFzcyBHZW5lcmF0ZWRGaWxlIHtcbiAgcHVibGljIHNvdXJjZTogc3RyaW5nfG51bGw7XG4gIHB1YmxpYyBzdG10czogU3RhdGVtZW50W118bnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBzcmNGaWxlVXJsOiBzdHJpbmcsIHB1YmxpYyBnZW5GaWxlVXJsOiBzdHJpbmcsIHNvdXJjZU9yU3RtdHM6IHN0cmluZ3xTdGF0ZW1lbnRbXSkge1xuICAgIGlmICh0eXBlb2Ygc291cmNlT3JTdG10cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuc291cmNlID0gc291cmNlT3JTdG10cztcbiAgICAgIHRoaXMuc3RtdHMgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gICAgICB0aGlzLnN0bXRzID0gc291cmNlT3JTdG10cztcbiAgICB9XG4gIH1cblxuICBpc0VxdWl2YWxlbnQob3RoZXI6IEdlbmVyYXRlZEZpbGUpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5nZW5GaWxlVXJsICE9PSBvdGhlci5nZW5GaWxlVXJsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgcmV0dXJuIHRoaXMuc291cmNlID09PSBvdGhlci5zb3VyY2U7XG4gICAgfVxuICAgIGlmIChvdGhlci5zdG10cyA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIE5vdGU6IHRoZSBjb25zdHJ1Y3RvciBndWFyYW50ZWVzIHRoYXQgaWYgdGhpcy5zb3VyY2UgaXMgbm90IGZpbGxlZCxcbiAgICAvLyB0aGVuIHRoaXMuc3RtdHMgaXMuXG4gICAgcmV0dXJuIGFyZUFsbEVxdWl2YWxlbnQodGhpcy5zdG10cyAhLCBvdGhlci5zdG10cyAhKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9UeXBlU2NyaXB0KGZpbGU6IEdlbmVyYXRlZEZpbGUsIHByZWFtYmxlOiBzdHJpbmcgPSAnJyk6IHN0cmluZyB7XG4gIGlmICghZmlsZS5zdG10cykge1xuICAgIHRocm93IG5ldyBFcnJvcihgSWxsZWdhbCBzdGF0ZTogTm8gc3RtdHMgcHJlc2VudCBvbiBHZW5lcmF0ZWRGaWxlICR7ZmlsZS5nZW5GaWxlVXJsfWApO1xuICB9XG4gIHJldHVybiBuZXcgVHlwZVNjcmlwdEVtaXR0ZXIoKS5lbWl0U3RhdGVtZW50cyhmaWxlLmdlbkZpbGVVcmwsIGZpbGUuc3RtdHMsIHByZWFtYmxlKTtcbn1cbiJdfQ==