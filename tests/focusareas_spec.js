// Generated by CoffeeScript 1.7.1
(function() {
  describe('Focusareas should', function() {
    ({
      before: function() {
        return Ember.run(function() {
          var store;
          store = App.__container__.lookup('store:main');
          store.find('themes');
          return store.find('focusareas');
        });
      }
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
        visit("/themes");
        return andThen(function() {
          return Ember.run(function() {
            var focusarea, store, theme;
            store = App.__container__.lookup('store:main');
            theme = store.createRecord("theme", {
              id: 4,
              definition: 'theme definition'
            });
            focusarea = store.createRecord("focusarea", {
              id: 5,
              definition: 'focusarea definition'
            });
            focusarea.save();
            theme.get("focusareas").then(function(focusareas) {
              focusareas.pushObject(focusarea);
              return theme.save();
            });
            expect(focusarea.get('definition')).to.equal('focusarea definition');
            return store.find('theme', 4).then(function(theme) {
              return theme.get('focusareas').then(function() {
                return expect(theme.get('focusareas').get('length')).to.equal(1);
              });
            });
          });
        });
      });
    });
    describe('a focusareas page', function() {
      it('should have an add new focusarea button', function() {
        visit('/themes/2/focusareas');
        return andThen(function() {
          findWithAssert('ul.theme-definitions li:contains("theme2") a.active');
          return findWithAssert('a.add-focusarea');
        });
      });
      it('should direct to the new route when clicked', function() {
        visit('/themes/2/focusareas');
        return andThen(function() {
          click('a.add-focusarea');
          return expect(currentURL()).to.equal('/themes/2/focusareas/new');
        });
      });
      return it('should have focus areas that each can be clicked to be edited', function() {
        visit('/themes/2/focusareas');
        return andThen(function() {
          return findWithAssert('ul.focusarea-definitions li:contains("focusarea definition") a');
        });
      });
    });
    describe('a new focusarea page that', function() {
      beforeEach(function() {
        return visit("/focusareas");
      });
      it('should have a field, a select box and a submit button', function() {
        return andThen(function() {
          return click('a.add-focusarea').then(function() {
            findWithAssert('form');
            findWithAssert('#definition');
            findWithAssert('select.focusarea-theme');
            return findWithAssert("button.submit-button");
          });
        });
      });
      it('should create a new focusarea entry when submit gets clicked', function() {
        return andThen(function() {
          click('a.add-focusarea');
          return fillIn('#definition', 'focusarea-definition1').fillIn('select.focusarea-theme', '4').click('button.submit-button').then(function() {
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
          return fillIn('#definition', 'focusarea-definition2').fillIn('select.focusarea-theme', '4').click('button.submit-button').then(function() {
            return expect(find('table.table tbody tr').length).to.equal(7);
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
            return fillIn('#definition', 'focusarea-definition3').fillIn('select.focusarea-theme', '4').click('button.update-button').then(function() {
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
              return expect(find('table.table tbody tr').length).to.equal(6);
            });
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=focusareas_spec.map
