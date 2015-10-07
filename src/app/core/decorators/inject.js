export function Inject(...dependencies) {
  return target => {
    target.$inject = dependencies;
  };
}
