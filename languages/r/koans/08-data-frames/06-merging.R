# title: Merging
# intro: `merge` joins two data frames on a shared column, like SQL's join; `all.x = TRUE` keeps rows with no match. `rbind` stacks rows.
people <- data.frame(
  name = c("Ada", "Alan", "Grace", "Edsger"),
  city = c("London", "London", "New York", "Austin"),
  age = c(36, 41, 85, 72)
)

countries <- data.frame(city = c("London", "Austin"), country = c("UK", "USA"))
joined <- merge(people, countries, by = "city")
test_that("an inner join", expect_equal(nrow(joined), ___))
left <- merge(people, countries, by = "city", all.x = TRUE)
test_that("a left join keeps everyone", expect_equal(nrow(left), ___))
test_that("with NA where nothing matched", expect_equal(left$country[left$city == "New York"], ___))
more <- rbind(people, data.frame(name = "Barbara", city = "Boston", age = 82))
test_that("rbind adds rows", expect_equal(nrow(more), ___))
