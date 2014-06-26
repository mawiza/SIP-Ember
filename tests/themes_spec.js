// Generated by CoffeeScript 1.7.1
(function() {
  describe('Themes should', function() {
    describe('should have a model that', function() {
      it('should have a content property', function() {
        var contentProperty;
        contentProperty = App.Theme.metaForProperty('definition');
        return expect(contentProperty.type).to.equal('string');
      });
      it('should have a focusareas property', function() {
        var contentProperty;
        contentProperty = App.Theme.metaForProperty('focusareas');
        return expect(contentProperty.type).to.equal('focusarea');
      });
      return it('can be created', function() {
        visit("/themes");
        return andThen(function() {
          return Ember.run(function() {
            var store, theme;
            store = App.__container__.lookup('store:main');
            theme = store.createRecord("theme", {
              id: 3,
              definition: 'theme definition'
            });
            theme.save();
            return expect(theme.get('definition')).to.equal('theme definition');
          });
        });
      });
    });
    describe('a themes page', function() {
      beforeEach(function() {
        return visit('/themes');
      });
      it('should have an add new theme button', function() {
        return findWithAssert('a.add-theme');
      });
      it('should direct to the new route when clicked', function() {
        return andThen(function() {
          click('a.add-theme');
          return expect(currentURL()).to.equal('/themes/new');
        });
      });
      return it('should have table with a header and one column', function() {
        return andThen(function() {
          findWithAssert('table.table');
          return expect(find('table.table thead tr th').length).to.equal(1);
        });
      });
    });
    describe('a new theme page that', function() {
      beforeEach(function() {
        return visit("/themes");
      });
      it('should have a field and a submit button', function() {
        return andThen(function() {
          return click('a.add-theme').then(function() {
            findWithAssert('form');
            findWithAssert('#definition');
            findWithAssert("button.submit-button");
            return findWithAssert("button.cancel-button");
          });
        });
      });
      it('should be possible to cancel the update', function() {
        visit("/themes");
        return andThen(function() {
          return click('a.add-theme').then(function() {
            return click('button.cancel-button').then(function() {
              return expect(currentURL()).to.equal('/themes');
            });
          });
        });
      });
      it('should create a new theme entry when submit gets clicked', function() {
        return andThen(function() {
          click('a.add-theme');
          return fillIn('#definition', 'theme-definition1').click('button.submit-button').then(function() {
            return expect(currentURL()).to.equal('/themes');
          });
        });
      });
      it('should be valid', function() {
        visit("/themes/new");
        return andThen(function() {
          return fillIn('#definition', '').click('button.submit-button').then(function() {
            return expect(currentURL()).to.equal('/themes/new');
          });
        });
      });
      it('should transition to the the themes page', function() {
        visit("/themes/new");
        return andThen(function() {
          return fillIn('#definition', 'theme-definition2').click('button.submit-button').then(function() {
            return expect(find('table.table tbody tr').length).to.equal(6);
          });
        });
      });
      return it('should have themes that each can be clicked to be edited', function() {
        visit("/themes");
        return andThen(function() {
          return findWithAssert('td.theme-definition:contains("theme-definition2") a');
        });
      });
    });
    return describe('an edit theme page that', function() {
      beforeEach(function() {
        return visit("/themes");
      });
      it('should be accessed from the themes page', function() {
        return andThen(function() {
          return click('td.theme-definition:contains("theme-definition1") a').then(function() {
            findWithAssert('form');
            findWithAssert('#definition');
            findWithAssert("button.update-button");
            return findWithAssert("button.delete-button");
          });
        });
      });
      it('should be possible to update the record', function() {
        return andThen(function() {
          return click('td.theme-definition:contains("theme-definition1") a').then(function() {
            return fillIn('#definition', 'theme-definition3').click('button.update-button').then(function() {
              expect(currentURL()).to.equal('/themes');
              return findWithAssert('td.theme-definition:contains("theme-definition3")');
            });
          });
        });
      });
      it('should be possible to cancel the update', function() {
        return andThen(function() {
          return click('td.theme-definition:contains("theme-definition3") a').then(function() {
            return click('button.cancel-button').then(function() {
              return expect(currentURL()).to.equal('/themes');
            });
          });
        });
      });
      return it('should be possible to delete the record', function() {
        return andThen(function() {
          return click('td.theme-definition:contains("theme-definition3") a').then(function() {
            return click('button.delete-button').then(function() {
              expect(currentURL()).to.equal('/themes');
              return expect(find('table.table tbody tr').length).to.equal(5);
            });
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=themes_spec.map