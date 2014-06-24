// Generated by CoffeeScript 1.7.1
(function() {
  describe('Focusareas should', function() {
    before(function() {
      return Ember.run(function() {
        App.Theme.FIXTURES = [
          {
            id: 1,
            definition: "theme1",
            focusareas: [1, 2]
          }, {
            id: 2,
            definition: "theme2",
            focusareas: [3, 4]
          }
        ];
        return App.Focusarea.FIXTURES = [
          {
            id: 1,
            definition: "focusarea1",
            theme: 1
          }, {
            id: 2,
            definition: "focusarea2",
            theme: 1
          }, {
            id: 3,
            definition: "focusarea3",
            theme: 2
          }, {
            id: 4,
            definition: "focusarea4",
            theme: 2
          }
        ];
      });
    });
    describe('should have a model that', function() {
      it('should have a content property', function() {
        var contentProperty;
        contentProperty = App.Focusarea.metaForProperty('definition');
        return expect(contentProperty.type).to.equal('string');
      });
      it('should have a focusareas property', function() {
        var contentProperty;
        contentProperty = App.Focusarea.metaForProperty('theme');
        return expect(contentProperty.type).to.equal('theme');
      });
      return it('can be created', function() {
        visit("/focusareas");
        return andThen(function() {
          return Ember.run(function() {
            var focusarea, store, theme;
            localStorage.clear();
            store = App.__container__.lookup("controller:focusareas").store;
            theme = store.createRecord("theme", {
              id: 3,
              definition: 'theme definition'
            });
            focusarea = store.createRecord("focusarea", {
              id: 4,
              definition: 'focusarea definition'
            });
            theme.get("focusareas").then(function(focusareas) {
              return focusareas.pushObject(focusarea);
            });
            return expect(focusarea.get('definition')).to.equal('focusarea definition');
          });
        });
      });
    });
    describe('a focusareas page', function() {
      beforeEach(function() {
        return visit('/focusareas');
      });
      it('should have an add new focusarea button', function() {
        return findWithAssert('a.add-focusarea');
      });
      it('should direct to the new route when clicked', function() {
        return andThen(function() {
          click('a.add-focusarea');
          return expect(currentURL()).to.equal('/focusareas/new');
        });
      });
      return it('should have table with a header and one columns', function() {
        return andThen(function() {
          findWithAssert('table.table');
          return expect(find('table.table thead tr th').length).to.equal(1);
        });
      });
    });
    describe('a new focusarea page that', function() {
      beforeEach(function() {
        return visit("/focusareas");
      });
      it('should have a field and a submit button', function() {
        return andThen(function() {
          return click('a.add-focusarea').then(function() {
            findWithAssert('form');
            findWithAssert('#definition');
            return findWithAssert("button.submit-button");
          });
        });
      });
      it('should create a new focusarea entry when submit gets clicked', function() {
        return andThen(function() {
          click('a.add-focusarea');
          return fillIn('#definition', 'focusarea-definition1').click('button.submit-button').then(function() {
            return expect(currentURL()).to.equal('/focusareas');
          });
        });
      });
      it('should be valid', function() {
        visit("/focusareas/new");
        return andThen(function() {
          return fillIn('#definition', '').click('button.submit-button').then(function() {
            return expect(currentURL()).to.equal('/focusareas/new');
          });
        });
      });
      it('should transition to the the focusareas page', function() {
        visit("/focusareas/new");
        return andThen(function() {
          return fillIn('#definition', 'focusarea-definition2').click('button.submit-button').then(function() {
            return expect(find('table.table tbody tr').length).to.equal(2);
          });
        });
      });
      return it('should have focusareas that each can be clicked to be edited', function() {
        visit("/focusareas");
        return andThen(function() {
          return findWithAssert('td.focusarea-definition:contains("focusarea-definition2") a');
        });
      });
    });
    return describe('an edit focusarea page that', function() {
      beforeEach(function() {
        return visit("/focusareas");
      });
      it('should be accessed from the focusareas page', function() {
        return andThen(function() {
          return click('td.focusarea-definition:contains("focusarea-definition1") a').then(function() {
            findWithAssert('form');
            findWithAssert('#definition');
            findWithAssert("button.update-button");
            return findWithAssert("button.delete-button");
          });
        });
      });
      it('should be possible to update the record', function() {
        return andThen(function() {
          return click('td.focusarea-definition:contains("focusarea-definition1") a').then(function() {
            return fillIn('#definition', 'focusarea-definition3').click('button.update-button').then(function() {
              expect(currentURL()).to.equal('/focusareas');
              return findWithAssert('td.focusarea-definition:contains("focusarea-definition3")');
            });
          });
        });
      });
      it('should be possible to cancel the update', function() {
        return andThen(function() {
          return click('td.focusarea-definition:contains("focusarea-definition3") a').then(function() {
            return click('button.cancel-button').then(function() {
              return expect(currentURL()).to.equal('/focusareas');
            });
          });
        });
      });
      return it('should be possible to delete the record', function() {
        return andThen(function() {
          return click('td.focusarea-definition:contains("focusarea-definition3") a').then(function() {
            return click('button.delete-button').then(function() {
              expect(currentURL()).to.equal('/focusareas');
              return expect(find('table.table tbody tr').length).to.equal(1);
            });
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=focusareas_spec.map
