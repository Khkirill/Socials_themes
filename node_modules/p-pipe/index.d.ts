/* eslint-disable import/export */
export type UnaryFunction<ValueType, ReturnType> = (
	value: ValueType
) => ReturnType | PromiseLike<ReturnType>;

export type Pipeline<ValueType, ReturnType> = (
	value?: ValueType
) => Promise<ReturnType>;

/**
Compose promise-returning & async functions into a reusable pipeline.

@param ...input - Iterated over sequentially when returned `function` is called.
@returns The `input` functions are applied from left to right.

@example
```
import pPipe from 'p-pipe';

const addUnicorn = async string => `${string} Unicorn`;
const addRainbow = async string => `${string} Rainbow`;

const pipeline = pPipe(addUnicorn, addRainbow);

console.log(await pipeline('❤️'));
//=> '❤️ Unicorn Rainbow'
```
*/
export default function pPipe<ValueType, ReturnType>(
	f1: UnaryFunction<ValueType, ReturnType>
): Pipeline<ValueType, ReturnType>;
export default function pPipe<ValueType, ResultValue1, ReturnType>(
	f1: UnaryFunction<ValueType, ResultValue1>,
	f2: UnaryFunction<ResultValue1, ReturnType>
): Pipeline<ValueType, ReturnType>;
export default function pPipe<ValueType, ResultValue1, ResultValue2, ReturnType>(
	f1: UnaryFunction<ValueType, ResultValue1>,
	f2: UnaryFunction<ResultValue1, ResultValue2>,
	f3: UnaryFunction<ResultValue2, ReturnType>
): Pipeline<ValueType, ReturnType>;
export default function pPipe<
	ValueType,
	ResultValue1,
	ResultValue2,
	ResultValue3,
	ReturnType
>(
	f1: UnaryFunction<ValueType, ResultValue1>,
	f2: UnaryFunction<ResultValue1, ResultValue2>,
	f3: UnaryFunction<ResultValue2, ResultValue3>,
	f4: UnaryFunction<ResultValue3, ReturnType>
): Pipeline<ValueType, ReturnType>;
export default function pPipe<
	ValueType,
	ResultValue1,
	ResultValue2,
	ResultValue3,
	ResultValue4,
	ReturnType
>(
	f1: UnaryFunction<ValueType, ResultValue1>,
	f2: UnaryFunction<ResultValue1, ResultValue2>,
	f3: UnaryFunction<ResultValue2, ResultValue3>,
	f4: UnaryFunction<ResultValue3, ResultValue4>,
	f5: UnaryFunction<ResultValue4, ReturnType>
): Pipeline<ValueType, ReturnType>;
export default function pPipe<
	ValueType,
	ResultValue1,
	ResultValue2,
	ResultValue3,
	ResultValue4,
	ResultValue5,
	ReturnType
>(
	f1: UnaryFunction<ValueType, ResultValue1>,
	f2: UnaryFunction<ResultValue1, ResultValue2>,
	f3: UnaryFunction<ResultValue2, ResultValue3>,
	f4: UnaryFunction<ResultValue3, ResultValue4>,
	f5: UnaryFunction<ResultValue4, ResultValue5>,
	f6: UnaryFunction<ResultValue5, ReturnType>
): Pipeline<ValueType, ReturnType>;
export default function pPipe<
	ValueType,
	ResultValue1,
	ResultValue2,
	ResultValue3,
	ResultValue4,
	ResultValue5,
	ResultValue6,
	ReturnType
>(
	f1: UnaryFunction<ValueType, ResultValue1>,
	f2: UnaryFunction<ResultValue1, ResultValue2>,
	f3: UnaryFunction<ResultValue2, ResultValue3>,
	f4: UnaryFunction<ResultValue3, ResultValue4>,
	f5: UnaryFunction<ResultValue4, ResultValue5>,
	f6: UnaryFunction<ResultValue5, ResultValue6>,
	f7: UnaryFunction<ResultValue6, ReturnType>
): Pipeline<ValueType, ReturnType>;
export default function pPipe<
	ValueType,
	ResultValue1,
	ResultValue2,
	ResultValue3,
	ResultValue4,
	ResultValue5,
	ResultValue6,
	ResultValue7,
	ReturnType
>(
	f1: UnaryFunction<ValueType, ResultValue1>,
	f2: UnaryFunction<ResultValue1, ResultValue2>,
	f3: UnaryFunction<ResultValue2, ResultValue3>,
	f4: UnaryFunction<ResultValue3, ResultValue4>,
	f5: UnaryFunction<ResultValue4, ResultValue5>,
	f6: UnaryFunction<ResultValue5, ResultValue6>,
	f7: UnaryFunction<ResultValue6, ResultValue7>,
	f8: UnaryFunction<ResultValue7, ReturnType>
): Pipeline<ValueType, ReturnType>;
export default function pPipe<
	ValueType,
	ResultValue1,
	ResultValue2,
	ResultValue3,
	ResultValue4,
	ResultValue5,
	ResultValue6,
	ResultValue7,
	ResultValue8,
	ReturnType
>(
	f1: UnaryFunction<ValueType, ResultValue1>,
	f2: UnaryFunction<ResultValue1, ResultValue2>,
	f3: UnaryFunction<ResultValue2, ResultValue3>,
	f4: UnaryFunction<ResultValue3, ResultValue4>,
	f5: UnaryFunction<ResultValue4, ResultValue5>,
	f6: UnaryFunction<ResultValue5, ResultValue6>,
	f7: UnaryFunction<ResultValue6, ResultValue7>,
	f8: UnaryFunction<ResultValue7, ResultValue8>,
	f9: UnaryFunction<ResultValue8, ReturnType>
): Pipeline<ValueType, ReturnType>;

// Fallbacks if more than 9 functions are passed as input (not type-safe).
export default function pPipe(
	...functions: Array<UnaryFunction<any, unknown>>
): Pipeline<unknown, unknown>;
