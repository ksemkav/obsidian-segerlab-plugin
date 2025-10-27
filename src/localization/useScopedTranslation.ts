import { FlatNamespace, KeyPrefix } from "i18next";
import { useTranslation, UseTranslationOptions, UseTranslationResponse } from "react-i18next";
import { $Tuple } from "react-i18next/helpers";

/*
Allows to specify the initial path of all translations returned by the function.
E.g. useScopedTranslation('Page.Login'). All translations will start with 'Page.Login.*'
 */
export function useScopedTranslation<N extends FlatNamespace, TKPrefix extends KeyPrefix<N>>(
  path: TKPrefix,
  ns?: N | $Tuple<N>,
  options?: UseTranslationOptions<TKPrefix>,
): UseTranslationResponse<N, TKPrefix> {
  const i18n = useTranslation(ns, { ...options, keyPrefix: path });
  return i18n;
}
