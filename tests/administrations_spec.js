// Generated by CoffeeScript 1.7.1
(function() {
  describe('The administration page should', function() {
    beforeEach(function() {
      return visit("/administrations");
    });
    it('have an add button', function() {
      return andThen(function() {
        expect(findWithAssert('a.add-administration')).to.exist;
        click('a.add-administration');
        expect(currentURL()).to.equal('/administrations/new');
        fillIn('#name', 'OPB');
        return fillIn('#color', '#000');
      });
    });
    return describe('have a table', function() {
      return it('with a header and two columns', function() {
        return andThen(function() {
          findWithAssert('table.table');
          return expect(find('table.table thead tr th').length).to.equal(2);
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=administrations_spec.map
