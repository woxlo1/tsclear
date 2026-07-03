import type { ErrorPattern } from "./types.js";
import { explain, getMessage, type ErrorExplanation, type Language } from "./i18n.js";

export const patterns: ErrorPattern[] = [
  {
    id: "type-not-assignable",
    code: "TS2322",
    match: /Type '(.+)' is not assignable to type '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `You're trying to use a value of type '${m[1]}' where type '${m[2]}' is expected. ` +
        `Check the value you're assigning, or update the target type if '${m[1]}' should actually be allowed there.`,
        `型 '${m[1]}' の値を型 '${m[2]}' が期待される場所で使用しようとしています。` +
        `割り当てている値を確認するか、型 '${m[1]}' が許可される場合は対象の型を更新してください。`
      ),
  },
  {
    id: "property-does-not-exist",
    code: "TS2339",
    match: /Property '(.+)' does not exist on type '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `You're accessing '.${m[1]}' on something typed as '${m[2]}', but that type has no such property. ` +
        `This usually means a typo, a missing type definition, or the object hasn't been narrowed to the right type yet.`,
        `型 '${m[2]}' のものに対して '.${m[1]}' にアクセスしていますが、その型にはそのようなプロパティはありません。` +
        `これは通常、タイプミス、型定義の欠落、またはオブジェクトがまだ正しい型に絞り込まれていないことを意味します。`
      ),
  },
  {
    id: "possibly-undefined",
    code: "TS18048",
    match: /'(.+)' is possibly 'undefined'\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' might be 'undefined' at this point. ` +
        `Add a check (like 'if (${m[1]})' or optional chaining '?.'), or use a non-null assertion '!' if you're certain it's always defined here.`,
        `'${m[1]}' はこの時点で 'undefined' である可能性があります。` +
        `チェックを追加するか ('if (${m[1]})' または オプショナルチェーン '?.' など)、確実に定義されている場合は非null アサーション '!' を使用してください。`
      ),
  },
  {
    id: "argument-mismatch",
    code: "TS2345",
    match: /Argument of type '(.+)' is not assignable to parameter of type '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `You're calling a function with an argument of type '${m[1]}', but it expects type '${m[2]}'. ` +
        `Double-check the value you're passing in, or the function's parameter type.`,
        `型 '${m[1]}' の引数で関数を呼び出していますが、型 '${m[2]}' を期待しています。` +
        `渡している値、または関数のパラメータ型を再確認してください。`
      ),
  },
  {
    id: "cannot-find-name",
    code: "TS2304",
    match: /Cannot find name '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' isn't defined anywhere TypeScript can see. ` +
        `This is usually a missing import, a typo, or a missing @types package for a third-party library.`,
        `'${m[1]}' は TypeScript が確認できる場所のどこにも定義されていません。` +
        `これは通常、インポートの欠落、タイプミス、またはサードパーティライブラリの @types パッケージの欠落です。`
      ),
  },
  {
    id: "object-possibly-null",
    code: "TS2531",
    match: /Object is possibly 'null'\.?$/,
    explain: () =>
      explain(
        `This value could be 'null' here. ` +
        `Add a check (like 'if (value !== null)') or optional chaining '?.' before using it, or use a non-null assertion '!' if you're certain it can't be null at this point.`,
        `この値はここで 'null' である可能性があります。` +
        `使用する前にチェック ('if (value !== null)' など) またはオプショナルチェーン '?.' を追加するか、確実に null でない場合は非null アサーション '!' を使用してください。`
      ),
  },
  {
    id: "missing-required-properties",
    code: "TS2741",
    match: /Property '(.+)' is missing in type '(.+)' but required in type '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `The object you're providing (of type '${m[2]}') is missing the required property '${m[1]}' that '${m[3]}' expects. ` +
        `Add '${m[1]}' to the object, or make it optional in the type definition if it shouldn't be required.`,
        `提供しているオブジェクト (型 '${m[2]}') には、'${m[3]}' が期待する必須プロパティ '${m[1]}' がありません。` +
        `'${m[1]}' をオブジェクトに追加するか、必須でない場合は型定義でオプショナルにしてください。`
      ),
  },
  {
    id: "wrong-argument-count",
    code: "TS2554",
    match: /Expected (\d+) arguments?, but got (\d+)\.?$/,
    explain: (m) =>
      explain(
        `This function expects ${m[1]} argument(s), but it's being called with ${m[2]}. ` +
        `Check the function's signature and make sure you're passing the right number of arguments.`,
        `この関数は ${m[1]} 個の引数を期待していますが、${m[2]} 個で呼び出されています。` +
        `関数のシグネチャを確認して、正しい数の引数を渡していることを確認してください。`
      ),
  },
  {
    id: "implicit-any-parameter",
    code: "TS7006",
    match: /Parameter '(.+)' implicitly has an '(.+)' type\.?$/,
    explain: (m) =>
      explain(
        `The parameter '${m[1]}' doesn't have an explicit type, so TypeScript is falling back to '${m[2]}'. ` +
        `Add a type annotation (e.g. '${m[1]}: string') to get proper type checking here.`,
        `パラメータ '${m[1]}' に明示的な型がないため、TypeScript は '${m[2]}' にフォールバックしています。` +
        `型アノテーション (例: '${m[1]}: string') を追加して、ここで適切な型チェックを取得してください。`
      ),
  },
  {
    id: "no-overload-matches",
    code: "TS2769",
    match: /No overload matches this call\.?$/,
    explain: () =>
      explain(
        `None of this function's overloads accept the arguments you're passing. ` +
        `Check the function's available signatures (hover over it in your editor) and compare them against what you're passing in — usually one argument's type is slightly off.`,
        `この関数のオーバーロードのいずれも、渡している引数を受け入れません。` +
        `関数の利用可能なシグネチャ (エディタでマウスオーバー) を確認して、渡しているものと比較してください。通常、いずれかの引数の型がわずかに異なります。`
      ),
  },
  {
    id: "did-you-mean",
    code: "TS2551",
    match: /Property '(.+)' does not exist on type '(.+)'\. Did you mean '(.+)'\?\.?$/,
    explain: (m) =>
      explain(
        `'.${m[1]}' doesn't exist on type '${m[2]}'. TypeScript thinks you meant '.${m[3]}' — check for a typo.`,
        `'.${m[1]}' は型 '${m[2]}' に存在しません。TypeScript は '.${m[3]}' を意図したと考えています。タイプミスを確認してください。`
      ),
  },
  {
    id: "not-callable",
    code: "TS2349",
    match: /This expression is not callable\./,
    explain: () =>
      explain(
        `You're trying to call something as a function, but its type says it isn't callable. ` +
        `Check whether the variable actually holds a function, or if you're missing parentheses somewhere.`,
        `何かを関数として呼び出そうとしていますが、その型は呼び出し不可能です。` +
        `変数が実際に関数を保持しているかどうか、または括弧が欠落していないかを確認してください。`
      ),
  },
  {
    id: "possibly-undefined-access",
    code: "TS2532",
    match: /Object is possibly 'undefined'\.?$/,
    explain: () =>
      explain(
        `This value might be 'undefined' at this point. ` +
        `Add a check (like 'if (value !== undefined)') or use optional chaining '?.' before accessing it.`,
        `この値はこの時点で 'undefined' である可能性があります。` +
        `アクセスする前にチェック ('if (value !== undefined)' など) またはオプショナルチェーン '?.' を使用してください。`
      ),
  },
  {
    id: "readonly-cannot-assign",
    code: "TS2540",
    match: /Cannot assign to '(.+)' because it is a read-only property\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' is marked as 'readonly' and cannot be reassigned after initialization. ` +
        `If you need to change this value, remove the 'readonly' modifier from the type definition.`,
        `'${m[1]}' は 'readonly' でマークされており、初期化後は再割り当てできません。` +
        `この値を変更する必要がある場合は、型定義から 'readonly' 修飾子を削除してください。`
      ),
  },
  {
    id: "cannot-find-module",
    code: "TS2307",
    match: /Cannot find module '(.+)' or its corresponding type declarations\.?$/,
    explain: (m) =>
      explain(
        `TypeScript can't find the module '${m[1]}'. ` +
        `Check that the package is installed ('npm install ${m[1]}'), and if it's a third-party library, you may also need '@types/${m[1]}' for type declarations.`,
        `TypeScript がモジュール '${m[1]}' を見つけることができません。` +
        `パッケージがインストールされているかどうかを確認してください ('npm install ${m[1]}')。また、サードパーティライブラリの場合、型宣言のために '@types/${m[1]}' が必要になる場合があります。`
      ),
  },
  {
    id: "type-has-no-index-signature",
    code: "TS7053",
    match: /Element implicitly has an 'any' type because expression of type '(.+)' can't be used to index type '(.+)'\./,
    explain: (m) =>
      explain(
        `You're indexing into '${m[2]}' with a key of type '${m[1]}', but that type has no index signature. ` +
        `Either add an index signature to the type, or use 'keyof' to constrain the key type.`,
        `型 '${m[1]}' のキーで '${m[2]}' にインデックスを付けていますが、その型にはインデックスシグネチャがありません。` +
        `型にインデックスシグネチャを追加するか、'keyof' を使用してキー型を制限してください。`
      ),
  },
  {
    id: "union-not-narrowed",
    code: "TS2367",
    match: /This condition will always return '(.+)' since the types '(.+)' and '(.+)' have no overlap\.?$/,
    explain: (m) =>
      explain(
        `Comparing '${m[2]}' and '${m[3]}' will always be '${m[1]}' because these two types can never be equal. ` +
        `This is usually a sign that a variable was narrowed to an unexpected type, or there's a logic error in your condition.`,
        `型 '${m[2]}' と '${m[3]}' を比較すると、これら 2 つの型が等しくなることはないため、常に '${m[1]}' になります。` +
        `これは通常、変数が予期しない型に絞り込まれたか、条件にロジックエラーがあることを示しています。`
      ),
  },
  {
    id: "missing-return-type",
    code: "TS2366",
    match: /Function lacks ending return statement and return type does not include 'undefined'\.?$/,
    explain: () =>
      explain(
        `Not all code paths in this function return a value, but the return type doesn't include 'undefined'. ` +
        `Either add a return statement at the end, or update the return type to include '| undefined'.`,
        `この関数内のすべてのコード パスが値を返すわけではありませんが、戻り値の型に 'undefined' が含まれていません。` +
        `最後に return ステートメントを追加するか、戻り値の型を '| undefined' を含めるように更新してください。`
      ),
  },
  {
    id: "abstract-class-instantiation",
    code: "TS2511",
    match: /Cannot create an instance of an abstract class\.?$/,
    explain: () =>
      explain(
        `You're trying to use 'new' on an abstract class, which isn't allowed. ` +
        `Abstract classes are meant to be extended, not instantiated directly — create a concrete subclass and instantiate that instead.`,
        `抽象クラスに対して 'new' を使用しようとしていますが、これは許可されていません。` +
        `抽象クラスは拡張されることを目的としており、直接インスタンス化されることはありません。具体的なサブクラスを作成してインスタンス化してください。`
      ),
  },
  {
    id: "conversion-may-be-mistake",
    code: "TS2352",
    match: /Conversion of type '(.+)' to type '(.+)' may be a mistake because neither type sufficiently overlaps with the other\./,
    explain: (m) =>
      explain(
        `Casting '${m[1]}' to '${m[2]}' looks suspicious because these types don't share enough in common. ` +
        `If you're sure about the cast, use 'unknown' as an intermediate step: '(value as unknown) as ${m[2]}'. Otherwise double-check your types.`,
        `型 '${m[1]}' を '${m[2]}' にキャストすることは疑わしいです。これらの型は共通点が十分にないからです。` +
        `キャストが確実な場合は、'unknown' を中間ステップとして使用してください: '(value as unknown) as ${m[2]}'。それ以外の場合は、型を再確認してください。`
      ),
  },
  {
    id: "unused-variable",
    code: "TS6133",
    match: /'(.+)' is declared but its value is never read\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' is declared but never used. ` +
        `Either remove it, use it somewhere, or prefix it with an underscore ('_${m[1]}') to signal it's intentionally unused.`,
        `'${m[1]}' は宣言されていますが、使用されていません。` +
        `削除するか、どこかで使用するか、意図的に使用されていないことを示すためにアンダースコア ('_${m[1]}') をプレフィックスしてください。`
      ),
  },
  {
    id: "no-exported-member",
    code: "TS2614",
    match: /Module '(.+)' has no exported member '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `'${m[2]}' doesn't exist as a named export in '${m[1]}'. ` +
        `Check the module's exports (its index file or type declarations), or look for a typo in the import name.`,
        `'${m[2]}' は '${m[1]}' の名前付きエクスポートとして存在しません。` +
        `モジュールのエクスポート (そのインデックス ファイルまたは型宣言) を確認するか、インポート名のタイプミスを探してください。`
      ),
  },
  {
    id: "type-used-as-value",
    code: "TS2693",
    match: /'(.+)' only refers to a type, but is being used as a value here\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' is a type, not a value — you can't use it at runtime. ` +
        `If you need a runtime check, use 'typeof' or create a class or enum instead.`,
        `'${m[1]}' は型であり、値ではありません。実行時に使用することはできません。` +
        `実行時チェックが必要な場合は、'typeof' を使用するか、クラスまたは enum を作成してください。`
      ),
  },
  {
    id: "cannot-invoke-possibly-undefined",
    code: "TS2722",
    match: /Cannot invoke an object which is possibly 'undefined'\.?$/,
    explain: () =>
      explain(
        `This function might be 'undefined' and can't be safely called. ` +
        `Add a check before calling it (e.g. 'if (fn) fn()') or use optional call syntax 'fn?.()'.`,
        `この関数は 'undefined' である可能性があり、安全に呼び出すことはできません。` +
        `呼び出す前にチェックを追加するか ('if (fn) fn()' など)、オプショナル呼び出し構文 'fn?.()' を使用してください。`
      ),
  },
  {
    id: "override-keyword-required",
    code: "TS4114",
    match: /This member must have an 'override' modifier because it overrides a member in the base class '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `This method overrides one in '${m[1]}' but is missing the 'override' keyword. ` +
        `Add 'override' before the method name to make the intent explicit and catch accidental overrides.`,
        `このメソッドは '${m[1]}' のメソッドをオーバーライドしていますが、'override' キーワードが見つかりません。` +
        `意図を明示的にし、意図しないオーバーライドをキャッチするために、メソッド名の前に 'override' を追加してください。`
      ),
  },
  {
    id: "array-implicit-any",
    code: "TS7015",
    match: /Element implicitly has an 'any' type because index expression is not of type 'number'\.?$/,
    explain: () =>
      explain(
        `You're indexing into an array with something that isn't a number, which gives an implicit 'any'. ` +
        `Make sure the index is typed as 'number', or use a Record/Map if you need string keys.`,
        `数字以外のものを使用して配列にインデックスを付けており、暗黙的な 'any' が発生しています。` +
        `インデックスが 'number' として型指定されていることを確認するか、文字列キーが必要な場合は Record/Map を使用してください。`
      ),
  },
  {
    id: "object-literal-excess-properties",
    code: "TS2559",
    match: /Type '(.+)' has no properties in common with type '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `The object you're passing (type '${m[1]}') shares no properties with '${m[2]}'. ` +
        `This usually means you're passing the wrong object entirely, or the type definition has changed.`,
        `渡しているオブジェクト (型 '${m[1]}') は、'${m[2]}' とプロパティを共有しません。` +
        `これは通常、完全に間違ったオブジェクトを渡しているか、型定義が変更されたことを意味します。`
      ),
  },
  {
    id: "unused-ts-expect-error",
    code: "TS2578",
    match: /Unused '@ts-expect-error' directive\.?$/,
    explain: () =>
      explain(
        `You have a '@ts-expect-error' comment but there's no error on the next line. ` +
        `Remove the comment since it's no longer needed — leaving it in can hide real errors in the future.`,
        `'@ts-expect-error' コメントがありますが、次の行にエラーがありません。` +
        `不要になったので、コメントを削除してください。そのままにしておくと、将来の実際のエラーが隠れる可能性があります。`
      ),
  },
  {
    id: "uninitialized-variable",
    code: "TS2448",
    match: /Block-scoped variable '(.+)' used before its declaration\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' is being used before it's declared. ` +
        `Move the declaration above the first use, or check for accidental variable shadowing.`,
        `'${m[1]}' が宣言される前に使用されています。` +
        `宣言を最初の使用より上に移動するか、変数のシャドーイングがないか確認してください。`
      ),
  },
  {
    id: "type-arguments-not-allowed",
    code: "TS2347",
    match: /Unresolved type arguments are not permitted\.?|Type arguments cannot be used here\.?$/,
    explain: () =>
      explain(
        `You're passing type arguments (the angle brackets '<...>') somewhere that doesn't accept them. ` +
        `Remove the type arguments, or check if you meant to call a generic function instead.`,
        `型引数 (角括弧 '<...>') を、受け入れない場所に渡しています。` +
        `型引数を削除するか、代わりにジェネリック関数を呼び出すことを意図していないか確認してください。`
      ),
  },
  {
    id: "cannot-assign-to-const",
    code: "TS2588",
    match: /Cannot assign to '(.+)' because it is a constant\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' was declared with 'const' and cannot be reassigned. ` +
        `Use 'let' instead of 'const' if you need to reassign it, or restructure your logic to avoid the reassignment.`,
        `'${m[1]}' は 'const' で宣言されており、再割り当てできません。` +
        `再割り当てが必要な場合は 'let' を 'const' の代わりに使用するか、再割り当てを避けるようにロジックを再構築してください。`
      ),
  },
  {
    id: "property-no-initializer",
    code: "TS2564",
    match: /Property '(.+)' has no initializer and is not definitely assigned in the constructor\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' is declared but never initialized. ` +
        `Either assign a value in the constructor, give it a default value, or mark it as optional ('${m[1]}?') or definitely assigned ('${m[1]}!').`,
        `'${m[1]}' は宣言されていますが、初期化されていません。` +
        `コンストラクタで値を割り当てるか、デフォルト値を指定するか、オプショナル ('${m[1]}?') または確実に割り当てられたもの ('${m[1]}!') としてマークしてください。`
      ),
  },
  {
    id: "object-is-unknown",
    code: "TS2571",
    match: /Object is of type 'unknown'\.?$/,
    explain: () =>
      explain(
        `You're trying to use a value typed as 'unknown' without narrowing it first. ` +
        `Use a type guard (e.g. 'typeof value === "string"' or 'instanceof') to narrow the type before accessing properties or calling methods.`,
        `型 'unknown' の値を、最初に絞り込まずに使用しようとしています。` +
        `プロパティにアクセスまたはメソッドを呼び出す前に、型ガード ('typeof value === "string"' または 'instanceof' など) を使用して型を絞り込んでください。`
      ),
  },
  {
    id: "cannot-find-namespace",
    code: "TS2503",
    match: /Cannot find namespace '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `The namespace '${m[1]}' doesn't exist anywhere TypeScript can see. ` +
        `This usually means a missing @types package or a missing triple-slash reference. Try 'npm install --save-dev @types/${m[1].toLowerCase()}'.`,
        `名前空間 '${m[1]}' は TypeScript が確認できるどこにも存在しません。` +
        `これは通常、@types パッケージの欠落またはトリプルスラッシュ参照の欠落を意味します。'npm install --save-dev @types/${m[1].toLowerCase()}' を試してください。`
      ),
  },
  {
    id: "class-incorrectly-implements-interface",
    code: "TS2420",
    match: /Class '(.+)' incorrectly implements interface '(.+)'\.?/,
    explain: (m) =>
      explain(
        `'${m[1]}' claims to implement '${m[2]}' but is missing or incorrectly defining some required members. ` +
        `Check that all properties and methods defined in '${m[2]}' are present in '${m[1]}' with matching types.`,
        `'${m[1]}' は '${m[2]}' を実装すると主張していますが、必須メンバーの一部が見つからないか、正しく定義されていません。` +
        `'${m[2]}' で定義されているすべてのプロパティとメソッドが、'${m[1]}' に一致する型で存在することを確認してください。`
      ),
  },
  {
    id: "function-implementation-missing",
    code: "TS2391",
    match: /Function implementation is missing or not immediately following the declaration\.?$/,
    explain: () =>
      explain(
        `You've declared a function signature but haven't provided an implementation, or the implementation isn't directly after the overload signatures. ` +
        `Add the implementation body immediately after all overload declarations.`,
        `関数シグネチャを宣言しましたが、実装を提供していないか、実装がオーバーロード シグネチャの直後にありません。` +
        `すべてのオーバーロード宣言の直後に実装本体を追加してください。`
      ),
  },
  {
    id: "property-not-assignable-base-type",
    code: "TS2416",
    match: /Property '(.+)' in type '(.+)' is not assignable to the same property in base type '(.+)'\.?/,
    explain: (m) =>
      explain(
        `'${m[2]}.${m[1]}' has a type that's incompatible with '${m[3]}.${m[1]}' from the base class or interface. ` +
        `The overriding type must be assignable to the base type — you can't widen the type when overriding.`,
        `'${m[2]}.${m[1]}' は、基本クラスまたはインターフェイスの '${m[3]}.${m[1]}' と互換性のない型を持っています。` +
        `オーバーライドする型は基本型に割り当て可能である必要があります。オーバーライド時に型を拡張することはできません。`
      ),
  },
  {
    id: "abstract-member-not-implemented",
    code: "TS2515",
    match: /Non-abstract class '(.+)' does not implement all abstract members of '(.+)'\.?/,
    explain: (m) =>
      explain(
        `'${m[1]}' extends an abstract class '${m[2]}' but hasn't implemented all of its abstract members. ` +
        `Add implementations for all abstract methods and properties, or mark '${m[1]}' as 'abstract' itself.`,
        `'${m[1]}' は抽象クラス '${m[2]}' を拡張していますが、その抽象メンバーのすべてを実装していません。` +
        `すべての抽象メソッドとプロパティの実装を追加するか、'${m[1]}' 自体を 'abstract' としてマークしてください。`
      ),
  },
  {
    id: "this-implicit-any",
    code: "TS2683",
    match: /'this' implicitly has type 'any' because it does not have a type annotation\.?$/,
    explain: () =>
      explain(
        `TypeScript can't figure out what 'this' refers to in this context. ` +
        `Add a 'this' parameter as the first parameter of the function (e.g. 'function foo(this: MyClass)'), or use an arrow function to inherit 'this' from the surrounding scope.`,
        `TypeScript がこのコンテキストで 'this' が何を参照しているかを判断できません。` +
        `関数の最初のパラメータとして 'this' パラメータを追加するか ('function foo(this: MyClass)' など)、矢関数を使用して周囲のスコープから 'this' を継承してください。`
      ),
  },
  {
    id: "type-instantiation-too-deep",
    code: "TS2589",
    match: /Type instantiation is excessively deep and possibly infinite\.?$/,
    explain: () =>
      explain(
        `TypeScript hit a recursion limit while resolving your types — usually caused by a circular or deeply nested generic type. ` +
        `Simplify the type, add an explicit type annotation to break the inference chain, or restructure the generic to avoid deep recursion.`,
        `TypeScript が型を解決する際に再帰制限に達しました。通常、循環型または深くネストされたジェネリック型が原因です。` +
        `型を単純化するか、推論チェーンを中断するための明示的な型アノテーションを追加するか、深い再帰を避けるようにジェネリックを再構築してください。`
      ),
  },
  {
    id: "must-return-value",
    code: "TS2355",
    match: /A function whose declared type is neither 'void' nor 'any' must return a value\.?$/,
    explain: () =>
      explain(
        `This function's return type says it should return a value, but it doesn't always do so. ` +
        `Make sure every code path returns the correct type, or change the return type to include 'void' or 'undefined' if returning nothing is intentional.`,
        `この関数の戻り値の型は値を返すべきであると言っていますが、常にそうではありません。` +
        `すべてのコード パスが正しい型を返していることを確認するか、何も返さないことが意図的な場合は、戻り値の型を 'void' または 'undefined' を含めるように変更してください。`
      ),
  },
  {
    id: "cannot-redeclare-variable",
    code: "TS2451",
    match: /Cannot redeclare block-scoped variable '(.+)'\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' has already been declared in this scope. ` +
        `You likely have two 'let' or 'const' declarations with the same name. Remove the duplicate or rename one of them.`,
        `'${m[1]}' はこのスコープで既に宣言されています。` +
        `同じ名前の 'let' または 'const' 宣言が 2 つある可能性があります。重複を削除するか、いずれかの名前を変更してください。`
      ),
  },
  {
    id: "variable-used-before-assigned",
    code: "TS2454",
    match: /Variable '(.+)' is used before being assigned\.?$/,
    explain: (m) =>
      explain(
        `'${m[1]}' might not have been assigned a value by the time it's used. ` +
        `Make sure '${m[1]}' is initialized before use, or give it a default value when declaring it.`,
        `'${m[1]}' が使用される時点で値が割り当てられていない可能性があります。` +
        `'${m[1]}' が使用前に初期化されていることを確認するか、宣言時にデフォルト値を指定してください。`
      ),
  },
  {
    id: "super-call-required",
    code: "TS2377",
    match: /Constructors for derived classes must contain a 'super' call\.?$/,
    explain: () =>
      explain(
        `When a class extends another, its constructor must call 'super()' before accessing 'this'. ` +
        `Add a 'super()' call as the first statement in the constructor.`,
        `クラスが別のクラスを拡張する場合、そのコンストラクタは 'this' にアクセスする前に 'super()' を呼び出す必要があります。` +
        `コンストラクタの最初のステートメントとして 'super()' 呼び出しを追加してください。`
      ),
  },
  {
    id: "object-possibly-null-or-undefined",
    code: "TS2533",
    match: /Object is possibly 'null' or 'undefined'\.?$/,
    explain: () =>
      explain(
        `This value could be either 'null' or 'undefined' at this point. ` +
        `Add a check (e.g. 'if (value != null)'), use optional chaining '?.', or use a non-null assertion '!' if you're certain it's defined.`,
        `この値はこの時点で 'null' または 'undefined' である可能性があります。` +
        `チェック ('if (value != null)' など) を追加するか、オプショナルチェーン '?.' を使用するか、確実に定義されている場合は非null アサーション '!' を使用してください。`
      ),
  },
  {
    id: "extends-instead-of-implements",
    code: "TS2689",
    match: /Cannot extend an interface '(.+)'\.\s*Did you mean 'implements'\.?/,
    explain: (m) =>
      explain(
        `You're using 'extends' on an interface in a class definition, but classes use 'implements' for interfaces. ` +
        `Change 'extends ${m[1]}' to 'implements ${m[1]}'.`,
        `クラス定義でインターフェイスに対して 'extends' を使用していますが、クラスはインターフェイスに 'implements' を使用します。` +
        `'extends ${m[1]}' を 'implements ${m[1]}' に変更してください。`
      ),
  },
  {
    id: "import-path-ts-extension",
    code: "TS2691",
    match: /An import path cannot end with a '\.ts' extension\.?/,
    explain: () =>
      explain(
        `Import paths should not include the '.ts' extension — TypeScript strips it during compilation. ` +
        `Remove the '.ts' from your import path, or use '.js' if you're targeting ESM output.`,
        `インポート パスに '.ts' 拡張子を含めないでください。TypeScript はコンパイル時にそれを削除します。` +
        `インポート パスから '.ts' を削除するか、ESM 出力をターゲットにしている場合は '.js' を使用してください。`
      ),
  },
  {
    id: "not-assignable-to-never",
    code: "TS2322",
    match: /Type '(.+)' is not assignable to type 'never'\.?$/,
    explain: (m) =>
      explain(
        `'never' means a value that should be impossible, but you're trying to assign '${m[1]}' to it. ` +
        `This often appears in exhaustive switch/if checks — if you're adding a new case to a union type, make sure all branches are handled.`,
        `'never' は不可能な値を意味しますが、'${m[1]}' をそれに割り当てようとしています。` +
        `これは、網羅的な switch/if チェックで頻繁に表示されます。union 型に新しいケースを追加する場合は、すべてのブランチが処理されていることを確認してください。`
      ),
  },
  {
    id: "setter-return-value",
    code: "TS2408",
    match: /Setters cannot return a value\.?$/,
    explain: () =>
      explain(
        `A 'set' accessor cannot return a value — setters always return 'void'. ` +
        `Remove the return statement from your setter.`,
        `'set' アクセサは値を返すことができません。セッターは常に 'void' を返します。` +
        `セッターから return ステートメントを削除してください。`
      ),
  },
  {
    id: "destructor-null",
    code: "TS2759",
    match: /Cannot destructure property '(.+)' of '(.+)' as it is '(null|undefined)'\.?$/,
    explain: (m) =>
      explain(
        `You're trying to destructure '${m[1]}' from '${m[2]}', but '${m[2]}' is '${m[3]}'. ` +
        `Add a null check before destructuring, or use a default value: 'const { ${m[1]} } = ${m[2]} ?? {}'.`,
        `'${m[1]}' を '${m[2]}' から分割代入しようとしていますが、'${m[2]}' は '${m[3]}' です。` +
        `分割代入の前に null チェックを追加するか、デフォルト値を使用してください: 'const { ${m[1]} } = ${m[2]} ?? {}'。`
      ),
  },
];

/**
 * Get explanation for a pattern in the specified language
 */
export function getPatternExplanation(pattern: ErrorPattern, match: RegExpMatchArray, lang: Language): string {
  const explanation = pattern.explain(match);
  return getMessage(explanation, lang);
}
