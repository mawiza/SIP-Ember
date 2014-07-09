// Generated by CoffeeScript 1.7.1
(function() {
  describe('Themes should', function() {
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
              definition: 'theme definition created calling createRecord'
            });
            return theme.save().then(function() {
              return expect(theme.get('definition')).to.equal('theme definition created calling createRecord');
            });
          });
        });
      });
    });
    describe('a themes page', function() {
      it('should have an add new theme button', function() {
        visit('/themes');
        return andThen(function() {
          return findWithAssert('a.add-theme');
        });
      });
      it('should direct to the new route when clicked', function() {
        visit('/themes');
        return andThen(function() {
          return click('a.add-theme').then(function() {
            return expect(currentURL()).to.equal('/themes/new');
          });
        });
      });
      return it('should display the first available theme\'s focusareas if any', function() {
        visit('/themes');
        return andThen(function() {
          return expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/);
        });
      });
    });
    describe('a new theme page that', function() {
      it('should have a field and a submit button', function() {
        visit("/themes");
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
              return expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/);
            });
          });
        });
      });
      it('should create a new theme entry when submit gets clicked', function() {
        visit("/themes");
        return andThen(function() {
          return click('a.add-theme').then(function() {
            return fillIn('#definition', 'theme-definition1').click('button.submit-button').then(function() {
              return expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/);
            });
          });
        });
      });
      it('should be valid', function() {
        visit("/themes");
        return andThen(function() {
          return click('a.add-theme').then(function() {
            return fillIn('#definition', '').click('button.submit-button').then(function() {
              return expect(currentURL()).to.equal('/themes/new');
            });
          });
        });
      });
      it('should transition to the the themes page', function() {
        visit("/themes");
        return andThen(function() {
          return click('a.add-theme').then(function() {
            return fillIn('#definition', 'theme-definition2').click('button.submit-button').then(function() {
              return expect(find('ul.theme-definitions li').length).to.equal(3);
            });
          });
        });
      });
      return it('should have themes that each can be clicked to be edited', function() {
        visit("/themes");
        return andThen(function() {
          return findWithAssert('ul.theme-definitions li:contains("theme-definition2") a');
        });
      });
    });
    return describe('an edit theme page that', function() {
      it('should be accessed from the themes page', function() {
        visit("/themes");
        return andThen(function() {
          return click('li:contains("theme-definition1") > a.edit-theme').then(function() {
            findWithAssert('form');
            findWithAssert('#definition');
            findWithAssert("button.update-button");
            return findWithAssert("button.delete-button");
          });
        });
      });
      it('should be possible to update the record', function() {
        visit("/themes");
        return andThen(function() {
          return click('li:contains("theme-definition1") > a.edit-theme').then(function() {
            return fillIn('#definition', 'theme-definition3').click('button.update-button').then(function() {
              expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/);
              return findWithAssert('li:contains("theme-definition3") > a.active');
            });
          });
        });
      });
      it('should be possible to cancel the update', function() {
        visit("/themes");
        return andThen(function() {
          return click('li:contains("theme-definition3") > a.edit-theme').then(function() {
            return click('button.cancel-button').then(function() {
              return expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/);
            });
          });
        });
      });
      return it('should be possible to delete a theme without focusareas', function() {
        visit("/themes");
        return andThen(function() {
          return click('li:contains("theme-definition3") > a.edit-theme').then(function() {
            return click('button.delete-button').then(function() {
              expect(currentURL()).to.match(/^\/themes\/.*\/focusareas$/);
              return expect(find('ul.theme-definitions li').length).to.equal(2);
            });
          });
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=themes_spec.map
