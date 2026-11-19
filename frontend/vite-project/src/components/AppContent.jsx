function AppContent({
    filteredPlaces,
    loading,
    navLikeClicked,
    setNavLikeClicked,
    searchTerm,
    searchBtnClicked,
    setSearchTerm,
    setSearchBtnClicked,
    setCoffeePlaces,
    searchVal,
    setSearchVal,
}) {
    const location = useLocation();

    const hideNavbar = [
        "/user/sign-in",
        "/user/sign-up",
    ].includes(location.pathname);

    return (
        <>
            {!hideNavbar && (
                <NavBar
                    setNavLikeClicked={setNavLikeClicked}
                    navLikeClicked={navLikeClicked}
                    coffeePlaces={filteredPlaces}
                    onSearch={setSearchTerm}
                    setSearchBtnClicked={setSearchBtnClicked}
                    setCoffeePlaces={setCoffeePlaces}
                    searchVal={searchVal}
                    setSearchVal={setSearchVal}
                />
            )}

            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            coffeePlaces={filteredPlaces}
                            loading={loading}
                            navLikeClicked={navLikeClicked}
                            searchTerm={searchTerm}
                            searchBtnClicked={searchBtnClicked}
                        />
                    }
                />

                <Route path="/liked-places" element={<LikedPlaces />} />
                <Route path="/user/sign-up" element={<UserSignUp />} />
                <Route path="/user/sign-in" element={<UserSignIn />} />
                <Route path="/new/add-location" element={<AddLocation />} />
            </Routes>
        </>
    );
}