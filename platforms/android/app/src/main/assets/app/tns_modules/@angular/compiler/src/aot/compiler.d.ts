/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CompileInjectableMetadata, CompileNgModuleMetadata, CompileShallowModuleMetadata } from '../compile_metadata';
import { CompilerConfig } from '../config';
import { MessageBundle } from '../i18n/message_bundle';
import { InjectableCompiler } from '../injectable_compiler';
import { CompileMetadataResolver } from '../metadata_resolver';
import { NgModuleCompiler } from '../ng_module_compiler';
import { OutputEmitter } from '../output/abstract_emitter';
import { StyleCompiler } from '../style_compiler';
import { SummaryResolver } from '../summary_resolver';
import { TemplateParser } from '../template_parser/template_parser';
import { TypeCheckCompiler } from '../view_compiler/type_check_compiler';
import { ViewCompiler } from '../view_compiler/view_compiler';
import { AotCompilerHost } from './compiler_host';
import { AotCompilerOptions } from './compiler_options';
import { GeneratedFile } from './generated_file';
import { LazyRoute } from './lazy_routes';
import { PartialModule } from './partial_module';
import { StaticReflector } from './static_reflector';
import { StaticSymbol } from './static_symbol';
import { StaticSymbolResolver } from './static_symbol_resolver';
export declare class AotCompiler {
    private _config;
    private _options;
    private _host;
    readonly reflector: StaticReflector;
    private _metadataResolver;
    private _templateParser;
    private _styleCompiler;
    private _viewCompiler;
    private _typeCheckCompiler;
    private _ngModuleCompiler;
    private _injectableCompiler;
    private _outputEmitter;
    private _summaryResolver;
    private _symbolResolver;
    private _templateAstCache;
    private _analyzedFiles;
    private _analyzedFilesForInjectables;
    constructor(_config: CompilerConfig, _options: AotCompilerOptions, _host: AotCompilerHost, reflector: StaticReflector, _metadataResolver: CompileMetadataResolver, _templateParser: TemplateParser, _styleCompiler: StyleCompiler, _viewCompiler: ViewCompiler, _typeCheckCompiler: TypeCheckCompiler, _ngModuleCompiler: NgModuleCompiler, _injectableCompiler: InjectableCompiler, _outputEmitter: OutputEmitter, _summaryResolver: SummaryResolver<StaticSymbol>, _symbolResolver: StaticSymbolResolver);
    clearCache(): void;
    analyzeModulesSync(rootFiles: string[]): NgAnalyzedModules;
    analyzeModulesAsync(rootFiles: string[]): Promise<NgAnalyzedModules>;
    private _analyzeFile(fileName);
    private _analyzeFileForInjectables(fileName);
    findGeneratedFileNames(fileName: string): string[];
    emitBasicStub(genFileName: string, originalFileName?: string): GeneratedFile;
    emitTypeCheckStub(genFileName: string, originalFileName: string): GeneratedFile | null;
    loadFilesAsync(fileNames: string[], tsFiles: string[]): Promise<{
        analyzedModules: NgAnalyzedModules;
        analyzedInjectables: NgAnalyzedFileWithInjectables[];
    }>;
    loadFilesSync(fileNames: string[], tsFiles: string[]): {
        analyzedModules: NgAnalyzedModules;
        analyzedInjectables: NgAnalyzedFileWithInjectables[];
    };
    private _createNgFactoryStub(outputCtx, file, emitFlags);
    private _externalIdentifierReferences(references);
    private _createTypeCheckBlock(ctx, componentId, moduleMeta, compMeta, directives, externalReferenceVars);
    emitMessageBundle(analyzeResult: NgAnalyzedModules, locale: string | null): MessageBundle;
    emitAllPartialModules({ngModuleByPipeOrDirective, files}: NgAnalyzedModules, r3Files: NgAnalyzedFileWithInjectables[]): PartialModule[];
    private _compileShallowModules(fileName, shallowModules, context);
    private _compilePartialModule(fileName, ngModuleByPipeOrDirective, directives, pipes, ngModules, injectables, context);
    emitAllPartialModules2(files: NgAnalyzedFileWithInjectables[]): PartialModule[];
    private _emitPartialModule2(fileName, injectables);
    emitAllImpls(analyzeResult: NgAnalyzedModules): GeneratedFile[];
    private _compileImplFile(srcFileUrl, ngModuleByPipeOrDirective, directives, pipes, ngModules, injectables);
    private _createSummary(srcFileName, directives, pipes, ngModules, injectables, ngFactoryCtx);
    private _compileModule(outputCtx, ngModule);
    private _compileComponentFactory(outputCtx, compMeta, ngModule, fileSuffix);
    private _compileComponent(outputCtx, compMeta, ngModule, directiveIdentifiers, componentStyles, fileSuffix);
    private _parseTemplate(compMeta, ngModule, directiveIdentifiers);
    private _createOutputContext(genFilePath);
    private _fileNameToModuleName(importedFilePath, containingFilePath);
    private _codegenStyles(srcFileUrl, compMeta, stylesheetMetadata, isShimmed, fileSuffix);
    private _codegenSourceModule(srcFileUrl, ctx);
    listLazyRoutes(entryRoute?: string, analyzedModules?: NgAnalyzedModules): LazyRoute[];
}
export interface NgAnalyzedModules {
    ngModules: CompileNgModuleMetadata[];
    ngModuleByPipeOrDirective: Map<StaticSymbol, CompileNgModuleMetadata>;
    files: NgAnalyzedFile[];
    symbolsMissingModule?: StaticSymbol[];
}
export interface NgAnalyzedFileWithInjectables {
    fileName: string;
    injectables: CompileInjectableMetadata[];
    shallowModules: CompileShallowModuleMetadata[];
}
export interface NgAnalyzedFile {
    fileName: string;
    directives: StaticSymbol[];
    pipes: StaticSymbol[];
    ngModules: CompileNgModuleMetadata[];
    injectables: CompileInjectableMetadata[];
    exportsNonSourceFiles: boolean;
}
export interface NgAnalyzeModulesHost {
    isSourceFile(filePath: string): boolean;
}
export declare function analyzeNgModules(fileNames: string[], host: NgAnalyzeModulesHost, staticSymbolResolver: StaticSymbolResolver, metadataResolver: CompileMetadataResolver): NgAnalyzedModules;
export declare function analyzeAndValidateNgModules(fileNames: string[], host: NgAnalyzeModulesHost, staticSymbolResolver: StaticSymbolResolver, metadataResolver: CompileMetadataResolver): NgAnalyzedModules;
export declare function analyzeFile(host: NgAnalyzeModulesHost, staticSymbolResolver: StaticSymbolResolver, metadataResolver: CompileMetadataResolver, fileName: string): NgAnalyzedFile;
export declare function analyzeFileForInjectables(host: NgAnalyzeModulesHost, staticSymbolResolver: StaticSymbolResolver, metadataResolver: CompileMetadataResolver, fileName: string): NgAnalyzedFileWithInjectables;
export declare function mergeAnalyzedFiles(analyzedFiles: NgAnalyzedFile[]): NgAnalyzedModules;
