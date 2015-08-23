// @see https://github.com/wycats/javascript-decorators

export default function Inject(...dependencies) {
  return (target) => {
    target.$inject = dependencies;
  };
}
