/*
 * Copyright (c) 2015-2017 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';
/**
 * @ngdoc controller
 * @name factories.controller:LastFactoriesController
 * @description This class is handling the controller of the last factories to display in the dashboard
 * @author Oleksii Orel
 */
class LastFactoriesController {
    /**
     * Default constructor
     * @ngInject for Dependency injection
     */
    constructor(cheFactory) {
        this.cheFactory = cheFactory;
        this.factories = this.cheFactory.getPageFactories();
        // todo we should change to modificationDate after model's change
        this.factoriesOrderBy = '-creator.created';
        this.maxItems = 5;
        // todo add OrderBy to condition in fetch API
        let promise = this.cheFactory.fetchFactories(this.maxItems, 0);
        this.isLoading = true;
        promise.finally(() => {
            this.isLoading = false;
            this.updateFactories();
        });
    }
    /**
     * Update factories array
     */
    updateFactories() {
        this.factories = this.cheFactory.getPageFactories();
    }
    /**
     * Returns the list of factories.
     *
     * @returns {Array<che.IFactory>}
     */
    getFactories() {
        return this.factories;
    }
}
exports.LastFactoriesController = LastFactoriesController;
