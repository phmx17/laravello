// compile and return err [] which will contain only non-internal errors; ie errors from the local page
export function gqlErrors(err) {
  const hasInternal = errors => errors.some(e => e.internal); // return true if at least one is true; check if at least one error in the list is internal;
  const replaceInternal = (errors, err) =>
    hasInternal(errors) ? errors.filter(e => !e.internal).concat(err) : errors; // weed out internal errors and return fresh array;

  if (err?.networkError && err.networkError.statusCode === 419) {
    throw new AuthError("Unauthenticated");
  }
  // ? = don't throw error if err is null or undefined; optional chaining
  // and when it is null or undefined (falsey) use empty []
  return replaceInternal((err?.graphQLErrors || []).map(error => {
    if ("validation" === error.extensions?.category) {
      const validationErr = error.extensions?.validation || {};
      Object.keys(validationErr).map(key => validationErr[key]);

      // Return an array of all values for each key; .flat() makes an array of arrays into one array
      return Object.keys(validationErr).map(key => validationErr[key]).flat().map(v => ({
        message: v,
        internal: false
      }));
    }

    return {
      message: error.message,
      internal: Boolean(!(error?.path?.length)) // more optional chaining; if there is no path (falsey) return true; this means that query did not even get to graphql server
    }
  }), {
    message: 'Something bad happened'
  }).flat();
}

export class AuthError extends Error {} // imported in apollo.config for the global error handler in ApolloClient

export const colorMap500 = {
  teal: "bg-teal-500",
  orange: "bg-orange-500",
  gray: "bg-gray-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  red: "bg-red-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500"
};

export const colorMap100 = {
  teal: "bg-teal-100",
  orange: "bg-orange-100",
  gray: "bg-gray-100",
  yellow: "bg-yellow-100",
  purple: "bg-purple-100",
  red: "bg-red-100",
  green: "bg-green-100",
  blue: "bg-blue-100",
  indigo: "bg-indigo-100"
};

export const colorMap200 = {
  teal: "bg-teal-200",
  orange: "bg-orange-200",
  gray: "bg-gray-200",
  yellow: "bg-yellow-200",
  purple: "bg-purple-200",
  red: "bg-red-200",
  green: "bg-green-200",
  blue: "bg-blue-200",
  indigo: "bg-indigo-200"
};

export const colorGrid = [
  ["teal", "orange", "gray"],
  ["yellow", "purple", "red"],
  ["green", "blue", "indigo"]
];